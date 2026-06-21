using System;

namespace SingletonPatternExample
{
    class Program
    {
        static void Main(string[] args)
        {
            Logger logger1 = Logger.Instance;
            logger1.Log("First message from logger1");

            Logger logger2 = Logger.Instance;
            logger2.Log("Second message from logger2");

            bool sameInstance = ReferenceEquals(logger1, logger2);
            Console.WriteLine($"Are logger1 and logger2 the same instance? {sameInstance}");
            Console.WriteLine($"logger1 hash code: {logger1.GetHashCode()}");
            Console.WriteLine($"logger2 hash code: {logger2.GetHashCode()}");

            Console.ReadLine();
        }
    }
}