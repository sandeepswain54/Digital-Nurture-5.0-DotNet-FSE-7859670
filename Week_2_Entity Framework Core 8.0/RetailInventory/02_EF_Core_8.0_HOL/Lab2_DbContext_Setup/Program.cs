using Microsoft.EntityFrameworkCore;
using Lab2_DbContext_Setup;

Console.WriteLine("=== Lab 2: Setting Up Database Context ===");
Console.WriteLine("");

using var context = new AppDbContext();
await context.Database.EnsureCreatedAsync();

Console.WriteLine("AppDbContext created successfully!");
Console.WriteLine("Connected to SQLite database: RetailStore.db");
Console.WriteLine("Products table ready!");
Console.WriteLine("Categories table ready!");
Console.WriteLine("");
Console.WriteLine("Database setup complete!");