// Anotation:  is a way to tell typescript what type of value a variable will refer to.
// uses : to annotate the type of a variable

// basic variable anotation
let johnName: string= 'John';
// variable name johnName is of type string therefore it can only hold string values and not any other type of value
console.log(johnName)

// function parameter anotation

const logAlbuminfo =(title:string, trackCount:number ,isReleased:boolean)=>{
    return `${title} by ${trackCount} has been released: ${isReleased}`
}
console.log(logAlbuminfo(`the Fame`,24,true))

// adding return type anotation in function
const logAlbuminfo2 =(title:string, trackCount:number ,isReleased:boolean):string=>{
    return `${title} by ${trackCount} has been released: ${isReleased}`
}
console.log(logAlbuminfo2(`the Fame`,24,true))

