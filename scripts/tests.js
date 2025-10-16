const validators = window.validators

// IIFE to encapsulate test logic
(function () {
  // Test cases
  const tests = {
    validation: [
      {
        name: "Title Valid",
        input: "Book Title",
        validator: "title",
        expected: true,
      },
      {
        name: "Title Invalid (Spaces)",
        input: "  Bad Title  ",
        validator: "title",
        expected: false,
      },
      {
        name: "Author Valid",
        input: "John Doe",
        validator: "author",
        expected: true,
      },
      {
        name: "Author Invalid (Special Char)",
        input: "John@Doe",
        validator: "author",
        expected: false,
      },
      {
        name: "ISBN Valid",
        input: "978-0-7475-3269-9",
        validator: "isbn",
        expected: true,
      },
      {
        name: "ISBN Invalid",
        input: "123",
        validator: "isbn",
        expected: false,
      },
      {
        name: "Date Valid",
        input: "2025-10-16",
        validator: "date",
        expected: true,
      },
      {
        name: "Date Invalid",
        input: "2025-13-01",
        validator: "date",
        expected: false,
      },
      {
        name: "Genre Valid",
        input: "Science Fiction",
        validator: "genre",
        expected: true,
      },
      {
        name: "Genre Invalid",
        input: "Sci-Fi123",
        validator: "genre",
        expected: false,
      },
    ],
    regex: [
      {
        name: "Advanced Valid",
        input: "Good Book",
        validator: "advanced",
        expected: true,
      },
      {
        name: "Advanced Invalid (Duplicate)",
        input: "Bad Bad Book",
        validator: "advanced",
        expected: false,
      },
    ],
  };

  // Assertion function
  const assert = (name, result, expected) => ({
    name,
    passed: result.isValid === expected,
    message: result.error || `Expected ${expected}, got ${result.isValid}`,
  });

  // Display results
  const displayResults = (results) => {
    const resultsList = document.getElementById("resultsList");
    resultsList.innerHTML = "";
    results.forEach((test) => {
      const li = document.createElement("li");
      li.className = `test-result ${test.passed ? "pass" : "fail"}`;
      li.textContent = `${test.name}: ${test.passed ? "Pass" : "Fail"} - ${
        test.message
      }`;
      resultsList.appendChild(li);
    });
  };

  // Run tests
  const runTests = (testCategory = null) => {
    const testSet = testCategory
      ? tests[testCategory]
      : [...tests.validation, ...tests.regex];
    const results = testSet.map((test) =>
      assert(test.name, validators[test.validator](test.input), test.expected)
    );
    displayResults(results);
  };

  // Event listeners
  document
    .getElementById("runAllTests")
    .addEventListener("click", () => runTests());
  document
    .getElementById("runValidationTests")
    .addEventListener("click", () => runTests("validation"));
  document
    .getElementById("runRegexTests")
    .addEventListener("click", () => runTests("regex"));

  // Run all tests on load
  runTests();
})();
