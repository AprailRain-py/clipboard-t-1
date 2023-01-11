# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- The unit test covers the remaining test where the event can be an object
- Refactoring - The refactoring requires on how the conditions have been applied and duplication of the codes. The existing code has the complex conditions to check the behviour of data and the code duplication. The refactor removes the code duplication while delegating the specific task of the function i.e. creating hash key, which makes it easier becuase in the future another package can be used to create hash thought it shouldnt be tightly coupled.
