import type { ExecutionSnapshot } from '../../state/types'



const base = {
  stepId: 'sw0',
  // Filled per-step
  currentLineNumber: 1,
  pointers: { left: 0, right: 0 },
  sum: 0,
  activeWindow: { startIndex: 0, endIndex: 0 },
  highlightedArrayIndices: [] as number[],
  prediction: {
    prompt: '',
    expectedAnswer: '',
    explanation: '',
  },
  successText: 'Nice.'
} satisfies Omit<ExecutionSnapshot, 'stepId'> & { stepId: string }

const snap = (stepId: string, partial: Partial<ExecutionSnapshot>): ExecutionSnapshot => {
  const b = {
    ...base,
    stepId,
  }
  return {
    ...b,
    ...partial,
    pointers: partial.pointers ?? b.pointers,
    activeWindow: partial.activeWindow ?? b.activeWindow,
    highlightedArrayIndices: partial.highlightedArrayIndices ?? b.highlightedArrayIndices,
    prediction: partial.prediction ?? b.prediction,
  }
}

// NOTE: step granularity is hand-authored for UI + prediction loop.
// Line numbers refer to the Monaco-like code we will render in the editor placeholder.
// Code we will show (line numbers):
// 1: int left = 0;
// 2: int sum = 0;
// 3:
// 4: for (int right = 0; right < arr.length; right++) {
// 5:     sum += arr[right];
// 6:
// 7:     while (sum > k) {
// 8:         sum -= arr[left];
// 9:         left++;
// 10:    }
// 11: }

export const slidingWindowMockTimeline: ExecutionSnapshot[] = [
  // Step 0: initialize before right=0 accumulates.
  snap('sw-0', {
    currentLineNumber: 4,
    pointers: { left: 0, right: 0 },
    sum: 0,
    activeWindow: { startIndex: 0, endIndex: 0 },
    highlightedArrayIndices: [0],
    prediction: {
      prompt: 'Right is 0, what is the new value of sum after `sum += arr[right]`?',
      expectedAnswer: 2,
      explanation: 'We add arr[0] = 2 to the initial sum 0.',
    },
    successText: 'Correct — sum becomes 2 after adding arr[0].',
  }),

  // Step 1: after sum += arr[right] for right=0
  snap('sw-1', {
    currentLineNumber: 5,
    pointers: { left: 0, right: 0 },
    sum: 2,
    activeWindow: { startIndex: 0, endIndex: 0 },
    highlightedArrayIndices: [0],
    prediction: {
      prompt: 'Now sum = 2 and k = 5. Does the while-loop run (sum > k)? Answer 1 for yes, 0 for no.',
      expectedAnswer: 0,
      explanation: '2 > 5 is false, so we do not shrink the window.',
    },
    successText: 'Good — the window is valid, so no shrinking.',
  }),

  // Step 2: right=1: accumulate
  snap('sw-2', {
    currentLineNumber: 4,
    pointers: { left: 0, right: 1 },
    sum: 2,
    activeWindow: { startIndex: 0, endIndex: 1 },
    highlightedArrayIndices: [1],
    prediction: {
      prompt: 'Right is 1. What is the new sum after `sum += arr[right]` (adding arr[1])?',
      expectedAnswer: 3,
      explanation: 'Current sum 2 plus arr[1] = 1 gives 3.',
    },
    successText: 'Correct — sum becomes 3.',
  }),

  // Step 3: after while check (still not shrinking)
  snap('sw-3', {
    currentLineNumber: 5,
    pointers: { left: 0, right: 1 },
    sum: 3,
    activeWindow: { startIndex: 0, endIndex: 1 },
    highlightedArrayIndices: [0, 1],
    prediction: {
      prompt: 'Now sum = 3. Does `while (sum > k)` run? (1=yes, 0=no)',
      expectedAnswer: 0,
      explanation: '3 > 5 is false, so left stays the same.',
    },
    successText: 'Correct — no shrinking needed yet.',
  }),

  // Step 4: right=2 accumulate, may trigger shrinking
  snap('sw-4', {
    currentLineNumber: 4,
    pointers: { left: 0, right: 2 },
    sum: 3,
    activeWindow: { startIndex: 0, endIndex: 2 },
    highlightedArrayIndices: [2],
    prediction: {
      prompt: 'Right is 2. What is the new sum after adding arr[2] (3)?',
      expectedAnswer: 6,
      explanation: 'Current sum 3 plus arr[2] = 3 gives 6.',
    },
    successText: 'Correct — sum becomes 6.',
  }),

  // Step 5: while condition true? (6 > 5)
  snap('sw-5', {
    currentLineNumber: 7,
    pointers: { left: 0, right: 2 },
    sum: 6,
    activeWindow: { startIndex: 0, endIndex: 2 },
    highlightedArrayIndices: [0, 1, 2],
    prediction: {
      prompt: 'Now sum = 6. Does the while-loop run? (1=yes, 0=no)',
      expectedAnswer: 1,
      explanation: '6 > 5 is true.',
    },
    successText: 'Yes — we need to shrink the window.',
  }),

  // Step 6: shrink iteration 1: sum -= arr[left] (left=0)
  snap('sw-6', {
    currentLineNumber: 8,
    pointers: { left: 0, right: 2 },
    sum: 6,
    activeWindow: { startIndex: 0, endIndex: 2 },
    highlightedArrayIndices: [0],
    prediction: {
      prompt: 'Shrinking: subtract arr[left]=arr[0]=2 from sum 6. What will the new sum be?',
      expectedAnswer: 4,
      explanation: '6 - 2 = 4.',
    },
    successText: 'Correct — sum becomes 4.',
  }),

  // Step 7: after left++
  snap('sw-7', {
    currentLineNumber: 9,
    pointers: { left: 1, right: 2 },
    sum: 4,
    activeWindow: { startIndex: 1, endIndex: 2 },
    highlightedArrayIndices: [1, 2],
    prediction: {
      prompt: 'After incrementing left to 1, is while-loop condition still true (sum > k)? (1=yes, 0=no)',
      expectedAnswer: 0,
      explanation: '4 > 5 is false, so we stop shrinking.',
    },
    successText: 'Good — window is valid again.',
  }),

  // Step 8: right=3 accumulate
  snap('sw-8', {
    currentLineNumber: 4,
    pointers: { left: 1, right: 3 },
    sum: 4,
    activeWindow: { startIndex: 1, endIndex: 3 },
    highlightedArrayIndices: [3],
    prediction: {
      prompt: 'Right is 3. Add arr[3]=2 to current sum 4. New sum?',
      expectedAnswer: 6,
      explanation: '4 + 2 = 6.',
    },
    successText: 'Correct — sum becomes 6.',
  }),

  // Step 9: while condition true (6>5)
  snap('sw-9', {
    currentLineNumber: 7,
    pointers: { left: 1, right: 3 },
    sum: 6,
    activeWindow: { startIndex: 1, endIndex: 3 },
    highlightedArrayIndices: [1, 2, 3],
    prediction: {
      prompt: 'Now sum = 6. Does the while-loop run? (1=yes, 0=no)',
      expectedAnswer: 1,
      explanation: '6 > 5 is true.',
    },
    successText: 'Yes — we must shrink.',
  }),

  // Step 10: shrink iteration: subtract arr[left]=arr[1]=1
  snap('sw-10', {
    currentLineNumber: 8,
    pointers: { left: 1, right: 3 },
    sum: 6,
    activeWindow: { startIndex: 1, endIndex: 3 },
    highlightedArrayIndices: [1],
    prediction: {
      prompt: 'Subtract arr[left]=arr[1]=1 from sum 6. New sum?',
      expectedAnswer: 5,
      explanation: '6 - 1 = 5.',
    },
    successText: 'Correct — sum becomes 5.',
  }),

  // Step 11: after left++ and while check (5>5 false)
  snap('sw-11', {
    currentLineNumber: 9,
    pointers: { left: 2, right: 3 },
    sum: 5,
    activeWindow: { startIndex: 2, endIndex: 3 },
    highlightedArrayIndices: [2, 3],
    prediction: {
      prompt: 'After left becomes 2, is while condition (sum > k) true? (1=yes, 0=no) with sum=5 and k=5.',
      expectedAnswer: 0,
      explanation: '5 > 5 is false.',
    },
    successText: 'Good — stop shrinking.',
  }),

  // Step 12: right=4 accumulate
  snap('sw-12', {
    currentLineNumber: 4,
    pointers: { left: 2, right: 4 },
    sum: 5,
    activeWindow: { startIndex: 2, endIndex: 4 },
    highlightedArrayIndices: [4],
    prediction: {
      prompt: 'Right is 4. Add arr[4]=4 to sum 5. New sum?',
      expectedAnswer: 9,
      explanation: '5 + 4 = 9.',
    },
    successText: 'Correct — sum becomes 9.',
  }),

  // Step 13: while condition true (9>5)
  snap('sw-13', {
    currentLineNumber: 7,
    pointers: { left: 2, right: 4 },
    sum: 9,
    activeWindow: { startIndex: 2, endIndex: 4 },
    highlightedArrayIndices: [2, 3, 4],
    prediction: {
      prompt: 'Now sum = 9. Does the while-loop run? (1=yes, 0=no)',
      expectedAnswer: 1,
      explanation: '9 > 5 is true.',
    },
    successText: 'Yes — shrink required.',
  }),

  // Step 14: first shrink iteration: subtract arr[left]=arr[2]=3
  snap('sw-14', {
    currentLineNumber: 8,
    pointers: { left: 2, right: 4 },
    sum: 9,
    activeWindow: { startIndex: 2, endIndex: 4 },
    highlightedArrayIndices: [2],
    prediction: {
      prompt: 'Subtract arr[left]=arr[2]=3 from sum 9. New sum?',
      expectedAnswer: 6,
      explanation: '9 - 3 = 6.',
    },
    successText: 'Correct — sum becomes 6.',
  }),

  // Step 15: after left++ and while check still true (6>5)
  snap('sw-15', {
    currentLineNumber: 9,
    pointers: { left: 3, right: 4 },
    sum: 6,
    activeWindow: { startIndex: 3, endIndex: 4 },
    highlightedArrayIndices: [3, 4],
    prediction: {
      prompt: 'After left becomes 3, is while condition (sum > k) true? (1=yes, 0=no) with sum=6 and k=5.',
      expectedAnswer: 1,
      explanation: '6 > 5 is true.',
    },
    successText: 'Correct — need another shrink.',
  }),

  // Step 16: second shrink iteration: subtract arr[left]=arr[3]=2
  snap('sw-16', {
    currentLineNumber: 8,
    pointers: { left: 3, right: 4 },
    sum: 6,
    activeWindow: { startIndex: 3, endIndex: 4 },
    highlightedArrayIndices: [3],
    prediction: {
      prompt: 'Subtract arr[left]=arr[3]=2 from sum 6. New sum?',
      expectedAnswer: 4,
      explanation: '6 - 2 = 4.',
    },
    successText: 'Correct — sum becomes 4.',
  }),

  // Step 17: after left++ and final while check (4>5 false)
  snap('sw-17', {
    currentLineNumber: 9,
    pointers: { left: 4, right: 4 },
    sum: 4,
    activeWindow: { startIndex: 4, endIndex: 4 },
    highlightedArrayIndices: [4],
    prediction: {
      prompt: 'After left becomes 4, is while condition true? (1=yes, 0=no) with sum=4 and k=5.',
      expectedAnswer: 0,
      explanation: '4 > 5 is false.',
    },
    successText: 'Perfect — window is valid and loop ends.',
  }),
]

