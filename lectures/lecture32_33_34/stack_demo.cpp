// stack_demo.cpp
// Shows how to use an abstract base class from stack_base.h to implement a stack data structure. It provides two different implementations, one using a vector and one using a list. Both inherit from the same stack base class and so they share the same interface. The function test_Stack(Stack_base* stack) is an example of runtime polymorphism: you can pass it a pointer to any type of Stack_base object and the correct methods will be called at runtime./*
#include "stack_base.h"
#include <cassert>
#include <iostream>
#include <vector>

using namespace std;

class Stack_vec : public Stack_base
{
  private:
    vector<int> stack;

  public:
    // constructor: create an empty stack
    Stack_vec() : stack() {}

    // the override keyword indicates a method that is overriding a method in
    // the base class
    void push(int value) override { stack.push_back(value); }

    void pop() override { stack.pop_back(); }

    int peek() override { return stack.back(); }

    bool is_empty() override { return stack.empty(); }
}; // class Stack_vec

class Stack_list : public Stack_base
{
  private:
    struct Node
    {
        int value;
        Node* next;
    };
    Node* top;

  public:
    // constructor: create an empty stack
    Stack_list() : top(nullptr) {}

    // destructor: remove all nodes from the stack
    ~Stack_list()
    {
        while (top != nullptr)
        {
            Node* temp = top;
            top        = top->next;
            delete temp;
        }
    }

    void push(int value) override { top = new Node{value, top}; }

    void pop() override
    {
        if (top == nullptr)
        {
            throw std::runtime_error("Stack is empty");
        }
        Node* temp = top;
        top        = top->next;
        delete temp;
    }

    int peek() override
    {
        if (top == nullptr)
        {
            throw std::runtime_error("Stack is empty");
        }
        return top->value;
    }

    bool is_empty() override { return top == nullptr; }

}; // class Stack_list

void test_Stack_vec()
{
    cout << "Testing Stack_vec ... ";
    Stack_vec stack;
    assert(stack.is_empty());
    stack.push(1);
    assert(!stack.is_empty());
    assert(stack.peek() == 1);
    stack.push(2);
    assert(stack.peek() == 2);
    stack.push(3);
    assert(stack.peek() == 3);
    stack.pop();
    assert(stack.peek() == 2);
    stack.pop();
    assert(stack.peek() == 1);
    assert(!stack.is_empty());
    cout << "done" << endl;
}

void test_Stack_list()
{
    cout << "Testing Stack_list ... ";
    Stack_list stack;
    assert(stack.is_empty());
    stack.push(1);
    assert(!stack.is_empty());
    assert(stack.peek() == 1);
    stack.push(2);
    assert(stack.peek() == 2);
    stack.push(3);
    assert(stack.peek() == 3);
    stack.pop();
    assert(stack.peek() == 2);
    stack.pop();
    assert(stack.peek() == 1);
    assert(!stack.is_empty());
    cout << "done" << endl;
}

//
// The test code for both stack implementations is the same, so lets write a
// single test function that takes a pointer to a Stack_base object and tests
// it.
//
// test_stack takes a pointer to a stack that has already been constructed and
// has size 0.
//
// We must pass a pointer to test_Stack because there is no way to create a
// Stack_base object directly from the Stack_base class (Stack_base is an
// abstract class with unimplemented methods).
//
// Note that by reading the source code we can't tell which is_empty() method is
// called when stack->is_empty() is called:
//
// - if stack points to a Stack_vec object, then the Stack_vec::is_empty()
//   method will be called
// - if stack points to a Stack_list object, then the Stack_list::is_empty()
//   method will be called
//
// This is an example of runtime polymorphism. We can write code that works with
// any object that is a subclass of Stack_base, and the correct method will be
// called at runtime.
//
void test_Stack(Stack_base* stack)
{
    assert(stack->is_empty());
    stack->push(1);
    assert(!stack->is_empty());
    assert(stack->peek() == 1);
    stack->push(2);
    assert(stack->peek() == 2);
    stack->push(3);
    assert(stack->peek() == 3);
    stack->pop();
    assert(stack->peek() == 2);
    stack->pop();
    assert(stack->peek() == 1);
    assert(!stack->is_empty());
}

void test_Stack_vec2()
{
    cout << "Testing Stack_vec2 ... ";
    Stack_vec stack;
    test_Stack(&stack);
    cout << "done" << endl;
}

void test_Stack_list2()
{
    cout << "Testing Stack_list2 ... ";
    Stack_list stack;
    test_Stack(&stack);
    cout << "done" << endl;
}

int main()
{
    test_Stack_vec();
    test_Stack_list();
    test_Stack_vec2();
    test_Stack_list2();
}
