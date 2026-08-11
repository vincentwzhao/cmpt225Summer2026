// iterator_fib.cpp
//Demonstrates the basic idea of an iterator using the Fibonacci sequence. Compared to most iterators, this is an infinite iterator (because the Fibonacci sequence is infinite), and so there is no need to check if there is a next element.
#include <iostream>

using namespace std;


//
// This demonstrates the basic idea of an iterator. In general, an iterator can
// be thought of as an object that returns the next element in a sequence. In
// this example, the sequence is the Fibonacci sequence. 
//
// More practically, iterators are used to return access to the elements of a
// collection without needing access to the implementation details of the
// collection.
//
// An important detail: Fib_iterator only has a single method, next(), which
// returns the next element in the sequence. It never runs out elements because
// the sequence is infinite (although eventually the numbers will get so big
// that you will get integer overflow).
//
// In general, through, iterators also need a method to determine if there is a
// next element.
//

class Fib_iterator
{
    int current_val = 0;
    int next_val    = 1;

  public:
    int next()
    {
        int result  = current_val;
        current_val = next_val;
        next_val    = result + next_val;
        return result;
    }
}; // Fib_iterator

int main()
{
    Fib_iterator fib;
    for (int i = 0; i < 10; i++)
    {
        cout << i << ": " << fib.next() << endl;
    }
}
