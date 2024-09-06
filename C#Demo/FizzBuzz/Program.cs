namespace FizzBuzz
{
    internal class Program
    {
        [Flags]
        public enum State
        {
            None = 0,
            Fizz = 1,
            Buzz = 2,
            FizzBuzz = 3,
        }
        static void Main(string[] args)
        {
            var result = FizzBuzz(15);
            foreach (var item in result)
            {
                Console.WriteLine(item);
            }
        }

        static IEnumerable<string> FizzBuzz(int i)
        {
            for (int j = 1; j <= i; j++)
            {
                var fb = State.None;

                if(j%3 == 0) { fb |= State.Fizz; }
                if(j%5 == 0) { fb |= State.Buzz; }

                switch (fb)
                {
                    case State.None:
                        yield return j.ToString();
                        break;
                    case State.Fizz:
                        yield return "Fizz";
                        break;
                    case State.Buzz:
                        yield return "Buzz";
                        break;
                    case State.FizzBuzz:
                        yield return "FizzBuzz"; 
                        break;
                    default:
                        yield return j.ToString();
                        break;
                }
            }
        }
    }
}
