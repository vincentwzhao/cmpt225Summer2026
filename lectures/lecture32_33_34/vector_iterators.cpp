// vector_iterators.cpp
/*
//High-level summary
- This program demonstrates how to store numbers in a vector (a resizable list) and then walk through that list in different ways: forward, backward, with simple loops, with iterator objects (which act like pointers), and how to sort and sum parts of the list. It has three small demos (demo1, demo2, demo3) and runs them from main().

Real‑world analogy
- Think of the vector like a row of numbered mailboxes. Each mailbox holds one number.
- An iterator is like your finger or a bookmark that points to a specific mailbox. You can move the bookmark along the row and look inside the mailbox it points to. Dereferencing an iterator (using *p) is like opening the mailbox the bookmark points to and reading the number inside.

Most important lines and what they do (simple explanations)

1) #include <vector>, <algorithm>, <iostream>
- These lines bring in the tools the program needs:
  - <vector> lets you use the vector container (resizable array).
  - <algorithm> gives you functions like sort and reverse.
  - <iostream> lets you print to the screen with cout.

2) vector<int> v = {7, 9, 2, 1, 8, 6, 4, 3, 5};
- Creates a vector named v that holds integers and fills it with those values.
- Think: "make a row of mailboxes and put those numbers in order."

3) for (vector<int>::iterator p = v.begin(); p != v.end(); p++)
     cout << *p << " ";
- This is an iterator loop:
  - v.begin() gives an iterator pointing to the first element (first mailbox).
  - v.end() gives an iterator pointing just past the last element (one-past-the-end).
  - p++ moves the iterator to the next element (next mailbox).
  - *p reads the value at the current iterator (opens the mailbox and reads the number).
- This loop prints all elements in v from first to last.

4) for (auto p = v.begin(); p != v.end(); p++) { cout << *p << " "; }
- Same as the previous loop but uses auto so you don't have to write the long type name. Using auto is common and simpler.

5) for (auto p = begin(v); p != end(v); p++) { cout << *p << " "; }
- begin(v) and end(v) are free functions that do the same as v.begin() and v.end(). This works for arrays and other containers too.

6) for (int x : v) { cout << x << " "; }
- Range-based for loop — shorthand to walk the whole container. It's like saying "for each mailbox, read the number inside."
- This is the simplest way to iterate when you only need the values.

7) for (auto p = v.rbegin(); p != v.rend(); p++) { cout << *p << " "; }
- rbegin() and rend() are reverse iterators. They let you walk the vector from the last element back to the first (walk the mailboxes backwards).

8) sort(v.begin(), v.end());
- Sorts the elements of v in ascending order (lowest to highest). It needs the begin/end iterators to know the range to sort.

9) reverse(v.begin(), v.end());
- Reverses the order of the elements in v. A quick trick to get descending order is to sort ascending then reverse.

10) int sum(vector<int>::iterator begin, vector<int>::iterator end)
     { int total = 0; for (auto p = begin; p != end; p++) total += *p; return total; }
- This function shows how iterators can be passed to a function instead of the whole vector.
- It sums (adds up) all elements in the half-open range [begin, end).
  - That means it includes begin but excludes end — so end acts like the “one-past-the-last” marker.

11) sum(v.begin() + 1, v.end() - 1)
- Uses iterator arithmetic to pass a sub-range: it starts at the second element (begin+1) and stops before the last (end-1), so it sums all elements except the first and last.

12) int main() { demo1(); demo2(); demo3(); }
- Runs the three demonstrations when you run the program.

A problem to note (small bug)
- In demo2 the code uses sort(arr, arr + 9); and later prints arr, but this file doesn't define arr anywhere. That will cause a compile error. Likely the author intended to show sorting a regular C array like:
    int arr[9] = {7,9,2,1,8,6,4,3,5};
  If u want to run that part, add a declaration like the line above before using arr, or use a vector instead.

Extra simple tips
- v.begin() is like "start here", v.end() is "stop after the last one" — remember end() points one past the last valid item.
- Use range-based for (for (int x : v)) when you only need values — it's shortest and safest.
- Use iterators when you need more control, want to pass a sub-range to a function, or use algorithms like sort and reverse.

If you want, I can:
- Show a corrected demo2 that defines arr, or
- Rewrite the code with comments beside each line to help you follow it step by step. Which would you prefer?
*/
#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

void demo1()
{
    cout << "demo1 ..." << endl;
    vector<int> v = {7, 9, 2, 1, 8, 6, 4, 3, 5};

    // p is like a pointer to an int in the vector v
    for (vector<int>::iterator p = v.begin(); p != v.end(); p++)
    {
        cout << *p << " ";
    }
    cout << endl;

    // the type name is so long that we usually use auto
    for (auto p = v.begin(); p != v.end(); p++)
    {
        cout << *p << " ";
    }
    cout << endl;

    // you can also call begin and end functions (instead of v.begin() and
    // v.end())
    for (auto p = begin(v); p != end(v); p++)
    {
        cout << *p << " ";
    }
    cout << endl;

    // if you want to iterator over the entire vector, you can use the
    // range-based for loop, which is "syntactic sugar" for the iterator loop
    for (int x : v)
    {
        cout << x << " ";
    }
    cout << endl;

    // vectors also have reverse iterators
    for (auto p = v.rbegin(); p != v.rend(); p++)
    {
        cout << *p << " ";
    }
    cout << endl;
}

void demo2()
{
    cout << "demo2 ..." << endl;
    vector<int> v = {7, 9, 2, 1, 8, 6, 4, 3, 5};

    // sorting using std::sort uses iterators
    sort(v.begin(), v.end());
    for (auto p = v.begin(); p != v.end(); p++)
    {
        cout << *p << " ";
    }
    cout << endl;

    // an easy trick for sorting in reverse is to sort in ascending order and
    // then reverse the vector and then call reverse()
    sort(v.begin(), v.end());
    reverse(v.begin(), v.end());
    for (auto p = v.begin(); p != v.end(); p++)
    {
        cout << *p << " ";
    }
    cout << endl;

    // std::sort can also sort regular arrays
    
    sort(arr, arr + 9);
    for (int i = 0; i < 9; i++)
    {
        cout << arr[i] << " ";
    }
    cout << endl;

    // you can print regular arrays treating the pointers like iterators
    for (auto p = begin(arr); p != end(arr); p++)
    {
        cout << *p << " ";
    }
    cout << endl;

    // or use the range-based for loop
    for (int x : arr)
    {
        cout << x << " ";
    }
    cout << endl;
}

// sums the elements in the range [begin, end); note that this function does not
// have direct access to the vector, it only has the iterators (pointers) to it
int sum(vector<int>::iterator begin, vector<int>::iterator end)
{
    int total = 0;
    for (auto p = begin; p != end; p++)
    {
        total += *p;
    }
    return total;
}

void demo3()
{
    cout << "demo3 ..." << endl;
    vector<int> v = {7, 9, 2, 1, 8, 6, 4, 3, 5};
    for (int x : v)
    {
        cout << x << " ";
    }
    cout << endl; 
    cout << "sum of v: " << sum(v.begin(), v.end()) << endl;
    cout << "sum of v, excluding first and last: " << sum(v.begin() + 1, v.end() - 1)
         << endl;
}

int main()
{
    demo1();
    demo2();
    demo3();
} // main
