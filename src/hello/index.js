function handler() {
    console.log("hello:::handler:::handler::(2)", process.env);
    console.log("hello:::handler:::handler::(3)", arguments);
}

module.exports = {handler}
