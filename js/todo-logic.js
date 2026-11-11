export function createTodo(text,id){const clean=String(text).trim();return clean?{id,text:clean,completed:false}:null}
export function filterTodos(todos,filter="all"){if(filter==="active")return todos.filter(t=>!t.completed);if(filter==="completed")return todos.filter(t=>t.completed);return [...todos]}
export function toggleTodo(todos,id){return todos.map(t=>t.id===id?{...t,completed:!t.completed}:t)}
export function deleteTodo(todos,id){return todos.filter(t=>t.id!==id)}
export function editTodo(todos,id,text){const clean=String(text).trim();return clean?todos.map(t=>t.id===id?{...t,text:clean}:t):[...todos]}
export function clearCompleted(todos){return todos.filter(t=>!t.completed)}
export function countActive(todos){return todos.filter(t=>!t.completed).length}