# Moq Hands-On Solutions

This document gave the full source code inline (unlike the other handouts), so this is built exactly to spec — with a few small typo fixes needed for it to actually compile:
- `Void AddNewPlayerIntoDb` → `void AddNewPlayerIntoDb` (capitalization)
- `_mailSender.SendMail(cust123@abc.com, "Some Message")` → wrapped the email address in quotes, since it's a string literal
- Curly quotes (`"India"`, `'Name'`) → straight quotes, since curly quotes aren't valid in C# string literals
- One **important framework note**: the doc asks for the `[ExpectedException]` attribute in Task 3. That attribute was removed in NUnit 3+ (we're using NUnit 4.2.2, matching your other exercises) — the modern equivalent is `Assert.That(() => ..., Throws.TypeOf<ArgumentException>())`, which is what I used. Functionally identical, just current syntax.

## Folder structure

```
Task1_MailServer_Mock/        → mocking IMailSender so no real email gets sent
├── CustomerCommLib/           (source: IMailSender, MailSender, CustomerComm)
└── CustomerComm.Tests/        (mocks SendMail to always return true)

Task2_FileSystem_Mock/        → mocking IDirectoryExplorer instead of static Directory.GetFiles
├── MagicFilesLib/              (source: IDirectoryExplorer, DirectoryExplorer)
└── DirectoryExplorer.Tests/    (mocks GetFiles to return 2 hardcoded filenames)

Task3_Database_Mock/          → mocking IPlayerMapper instead of hitting a real SQL Server
├── PlayersManagerLib/          (source: IPlayerMapper, PlayerMapper, Player)
└── PlayerManager.Tests/        (mocks IsPlayerNameExistsInDb / AddNewPlayerIntoDb)
```

## How to run

```powershell
cd Task1_MailServer_Mock\CustomerComm.Tests
dotnet test
```
Repeat for `Task2_FileSystem_Mock\DirectoryExplorer.Tests` and `Task3_Database_Mock\PlayerManager.Tests`.

## What each test demonstrates

**Task 1 — Mail server:** `CustomerComm` takes `IMailSender` through its **constructor** (constructor injection — exactly what the doc calls out). The test never touches a real SMTP server; `_mockMailSender.Setup(...).Returns(true)` makes `SendMail()` always succeed instantly, regardless of the two string arguments passed (`It.IsAny<string>()`).

**Task 2 — File system:** Instead of testing the static `Directory.GetFiles()` (which Moq can't mock — static methods aren't mockable), the code was refactored behind an `IDirectoryExplorer` interface. The mock returns `_file1` and `_file2` as a hardcoded fake file list, and the test asserts the collection isn't null, has count 2, and contains `_file1`.

**Task 3 — Database:** `Player.RegisterNewPlayer` takes an *optional* `IPlayerMapper` parameter — if you don't pass one (real usage), it creates a real `PlayerMapper` that hits SQL Server; if you do pass one (testing), it uses your mock instead. The mock makes `IsPlayerNameExistsInDb` return `false` so registration succeeds, then asserts the resulting `Player`'s `Name`, `Age`, `Country`, and `NoOfMatches` all match expectations. A second test flips the mock to return `true` to verify the "name already exists" exception path ..
