# NUnit Hands-On Solutions (1–9)

## Important note on the source projects

Each handout links to a private Cognizant SharePoint zip (`CalcLibrary.zip`, `UtilLib.zip`, etc.) that I cannot access. So for every exercise I wrote a **representative source class** ("SUT" — System Under Test) that implements exactly the behavior described in the document, with the same method names and same business rules. The NUnit test code — which is the actual point of this lab — is fully correct and complete. If your instructor provides the official source files, you can swap them in; as long as the method names/signatures match, the tests will still work.

Also: the original docs say ".NET Framework". I've built everything on modern **.NET 8** instead, since that's what you already have installed and working (`dotnet` CLI) — the NUnit code itself is identical either way.

## Folder structure

```
01_CalcLibrary_Addition/        → Exercise 1: TestFixture, SetUp, TearDown, TestCase, Assert.That
02_CalcLibrary_AllOperations/   → Exercise 2: parameterized tests, exceptions, testing void methods
03_UtilLib_ParseHostName/       → Exercise 3: 2 execution paths, Single Assertion Rule
04_AccountsManagerLib_Login/    → Exercise 4: login logic, ArgumentException
05_CollectionsLib_Employees/    → Exercise 5: CollectionAssert, Equals/GetHashCode override
06_FourSeasonsLib_Season/       → Exercise 6: TestCaseSource (two different ways)
07_LeapYearCalculatorLib/       → Exercise 7: parameterized tests, boundary values
08_UserManagerLib_CreateUser/   → Exercise 8: NullReferenceException, FormatException
09_ConverterLib_Moq/            → Exercise 9: Moq framework, mocking an external dependency
```

Each exercise folder has two projects:
- The **source library** (e.g. `CalcLibrary/`) — the code being tested
- The **test project** (e.g. `CalcLibrary.Tests/`) — the NUnit tests, ending in `.Tests`

## How to run any exercise

Open a terminal, go into the **`.Tests`** folder for that exercise, and run:

```powershell
cd 01_CalcLibrary_Addition\CalcLibrary.Tests
dotnet test
```

`dotnet test` automatically restores NuGet packages (NUnit, NUnit3TestAdapter, Microsoft.NET.Test.Sdk, and Moq for Exercise 9), builds both the source library and test project (since the test project references the source library), and runs every `[Test]`/`[TestCase]` method. You'll see a summary like:

```
Passed!  - Failed: 0, Passed: 4, Skipped: 0, Total: 4
```

Repeat for each exercise folder, e.g.:
```powershell
cd ..\..\02_CalcLibrary_AllOperations\CalcLibrary.Tests
dotnet test
```

## Per-exercise notes

**Exercise 1** — `Calculator.Add` tested with 4 `[TestCase]` values, using `[SetUp]`/`[TearDown]` to create/destroy the calculator before and after each test.

**Exercise 2** — `MathLibrary` has `Add`, `Subtract`, `Multiply`, `Divide`, a `GetResult` property, and `AllClear()`. Division by zero throws `ArgumentException` with message "Division by zero", caught with try/catch and `Assert.Fail` per the handout. `TestAddAndClear` demonstrates testing a void method (`AllClear`) by checking its side effect on `GetResult`.

**Exercise 3** — `ParseHostName` has 2 execution paths: URL with `://` protocol prefix, and URL without one. Both are tested.

**Exercise 4** — Valid logins return `"Welcome <user_id>!!!"`, invalid ones return `"Invalid user id/password"`, and missing user id/password throws `ArgumentException`.

**Exercise 5** — `Employee` overrides `Equals`/`GetHashCode` (by `Id`) so `CollectionAssert.AllItemsAreUnique` works correctly. Tests cover: no nulls, employee ID 100 exists, all employees unique, and that `GetEmployees()` vs `GetEmployeesWhoJoinedInPreviousYears()` are NOT equivalent (one employee in the sample data joined "today" so they differ) — shown both in Classic Model (`CollectionAssert`) and Constraint Model (`Assert.That(..., Is.Not.EquivalentTo(...))`).

**Exercise 6** — Two different `TestCaseSource` styles: a `private static` method in the same test class (straightforward), and a separate external class referenced via `typeof(...)` (alternate) — both achieve the same coverage with minimal code, avoiding one test method per month.

**Exercise 7** — Leap year logic uses the standard rule (divisible by 4, not by 100 unless also by 400), with boundary tests for the valid year range (1753–9999) returning -1 outside it.

**Exercise 8** — `CreateUser` throws `NullReferenceException` for null input and `FormatException` for wrong-length PAN numbers, plus one happy-path test.

**Exercise 9** — `IDollarToEuroExchangeRateFeed` is mocked with `Moq` so the test never calls a real external service. `mockFeed.Setup(...).Returns(...)` controls the fake exchange rate, and the last test uses `mockFeed.Verify(...)` to confirm the dependency was actually called.
