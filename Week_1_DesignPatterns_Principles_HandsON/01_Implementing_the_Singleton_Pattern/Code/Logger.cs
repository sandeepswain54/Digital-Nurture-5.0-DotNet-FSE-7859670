using System;

namespace SingletonPatternExample
{
    public sealed class Logger
    {
        private static Logger? _instance = null;
        private static readonly object _lock = new object();

        private Logger()
        {
            Console.WriteLine("Logger instance created.");
        }

        public static Logger Instance
        {
            get
            {
                if (_instance == null)
                {
                    lock (_lock)
                    {
                        if (_instance == null)
                        {
                            _instance = new Logger();
                        }
                    }
                }
                return _instance;
            }
        }

        public void Log(string message)
        {
            Console.WriteLine($"[LOG - {DateTime.Now:HH:mm:ss}] {message}");
        }
    }
}