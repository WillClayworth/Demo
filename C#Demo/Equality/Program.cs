using System.Diagnostics;

namespace Equality
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var demo = new EqualityDemo();

            var eqStopwatch = new Stopwatch();
            eqStopwatch.Start();
            for (int i = 0; i < 10000; i++)
            {
                if (demo == null)
                {
                    /*
                    IL_0000:  nop
                    IL_0001:  newobj     instance void Equality.Program/Demo::.ctor()
                    IL_0006:  stloc.0
                    IL_0007:  ldloc.0
                    IL_0008:  ldnull
                    IL_0009:  call       bool Equality.Program/Demo::op_Equality(class Equality.Program/Demo,
                                                                                class Equality.Program/Demo)
                    IL_000e:  stloc.1
                    IL_000f:  ldloc.1
                    IL_0010:  brfalse.s  IL_001f
                    IL_0012:  nop
                    IL_0013:  ldstr      "demo equals null"
                    IL_0018:  call       void [System.Console]System.Console::WriteLine(string)
                    IL_001d:  nop
                    IL_001e:  nop
                    IL_001f:  ret
                     */
                }
            }
            eqStopwatch.Stop();

            var isStopwatch = new Stopwatch();
            isStopwatch.Start();
            for (int i = 0; i < 10000; i++)
            {
                if (demo is null)
                {
                    /*
                    IL_0000:  nop
                    IL_0001:  newobj     instance void Equality.Program/Demo::.ctor()
                    IL_0006:  stloc.0
                    IL_0007:  ldloc.0
                    IL_0008:  ldnull
                    IL_0009:  ceq
                    IL_000b:  stloc.1
                    IL_000c:  ldloc.1
                    IL_000d:  brfalse.s  IL_001c
                    IL_000f:  nop
                    IL_0010:  ldstr      "demo is null"
                    IL_0015:  call       void [System.Console]System.Console::WriteLine(string)
                    IL_001a:  nop
                    IL_001b:  nop
                    IL_001c:  ret
                     */
                }
            }
            isStopwatch.Stop();

            Console.WriteLine($"Time taken for ==: {eqStopwatch.ElapsedTicks}");
            Console.WriteLine($"Time taken for is: {isStopwatch.ElapsedTicks}");

        }

        public class EqualityDemo
        {
            public int id;

            public override bool Equals(object? obj)
            {
                return base.Equals(obj);
            }

            public override int GetHashCode()
            {
                return base.GetHashCode();
            }

            public static bool operator ==(EqualityDemo? initial, EqualityDemo? expected)
            {
                return true;
            }

            public static bool operator !=(EqualityDemo? initial, EqualityDemo? expected)
            {
                return false;
            }
        }
    }
}
