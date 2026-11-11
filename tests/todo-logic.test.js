import test from "node:test";import assert from "node:assert/strict";import{createTodo,filterTodos,toggleTodo,deleteTodo,editTodo,clearCompleted,countActive}from"../js/todo-logic.js";const todos=[{id:1,text:"Learn JS",completed:false},{id:2,text:"Submit",completed:true},{id:3,text:"Test",completed:false}];
test("createTodo trims and rejects blank input",()=>{assert.deepEqual(createTodo(" Read ",4),{id:4,text:"Read",completed:false});assert.equal(createTodo(" ",5),null)});
test("filters return expected tasks",()=>{assert.equal(filterTodos(todos).length,3);assert.deepEqual(filterTodos(todos,"active").map(t=>t.id),[1,3]);assert.deepEqual(filterTodos(todos,"completed").map(t=>t.id),[2])});
test("toggle changes selected task without mutating source",()=>{assert.equal(toggleTodo(todos,1)[0].completed,true);assert.equal(todos[0].completed,false)});
test("delete removes selected task",()=>assert.deepEqual(deleteTodo(todos,2).map(t=>t.id),[1,3]));
test("edit trims text and ignores blank values",()=>{assert.equal(editTodo(todos,1," New ")[0].text,"New");assert.deepEqual(editTodo(todos,1," "),todos)});
test("clearCompleted keeps active tasks",()=>assert.deepEqual(clearCompleted(todos).map(t=>t.id),[1,3]));
test("countActive counts unfinished tasks",()=>assert.equal(countActive(todos),2));