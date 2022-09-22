/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
 exports.findAllSolutions = function(grid, dictionary) {
    answer = []
    let hash = createHashMap(dictionary);
  
    //edge case for dictionary size check
    if (dictionary.length == 0 || grid.length == 0 || grid.length == 1) {
        return answer
    }
    // edge case for grid size check
    for (i = 0; i <grid.length; i ++){
      if (grid.length != grid[i].length){
        return answer;
      }
    }
  
    // turn grid all lowercase
    for ( var i = 0; i < grid.length; i++){
        for (var j = 0; j < grid.length; j++){
                grid[i][j] = grid[i][j].toLowerCase()
        }
      }
  /*
    words_dictionary = new Map();
    words_dictionary2 = {}
    prefix_dictionary2 = {}
    prefix = new Set();
    for (var words, index = 0; index < dictionary.length; index += 1) {
      dictionary[index] = dictionary[index].toLowerCase()
      words = dictionary[index];
      words_dictionary.set(words)
      if(!words_dictionary2[words]){
        words_dictionary2[words] = 1
      }
      //console.log(words)

      if (words[words.length - 1] == 'q'){
          // if last letter in word is q dont add to prefix
              //console.log(words, "checking to see if word ends in q")
      }
      else{
        for (var i = 1; i < words.length + 1; i += 1) {
          
          prefix.add(words.slice(0, i).toLowerCase());
          if(!prefix_dictionary2[words.slice(0, i)]){
            prefix_dictionary2[words.slice(0, i)] = 1
          }
        }
      }
    }
    */
    //console.log(prefix_dictionary2['a'])
    /*
    prefix_dictionary = new Map();
    prefix_dictionary2 = {}
    for (words of prefix) {
        if(!prefix_dictionary2[words]){
           prefix_dictionary2[words] = 1
        }
        prefix_dictionary.set(words)
        }
        */
    //console.log(words_dictionary)
    //console.log(prefix_dictionary2)

    var visited = Array.from(Array(grid.length), () => new Array(grid.length).fill(0));

    //  recursion to solve boggle
    word = ""
    for ( var i = 0; i < grid.length; i++){
        for (var j = 0; j < grid.length; j++){
                node = [i, j]
                visited[i][j] = false
            dfs(grid, i, j, hash, visited, word, answer)
        }
    }
    return Array.from(new Set(answer))

 }
 createHashMap = function(dictionary){
   var dict = {};
   for(let i = 0; i < dictionary.length; i++){
     dict[dictionary[i].toLowerCase()] = 1;
     let wordlength = dictionary[i].length;
     var str = dictionary[i];
     for (let j = wordlength; wordlength > 1; wordlength--){
       str = str.substr(0, wordlength- 1).toLowerCase();
       if(str in dict){
         if(str == 1){
           dict[str] = 1;
         }
       }
       else{
         dict[str] = 0;
       }
     }
   }
   return dict;
 }
function dfs(grid, i, j,hash, visited, word, answer){
    visited[i][j] = true
    word += grid[i][j]
    // console.log(word)
    if (hash[word] == 1 && word.length >= 3){
        answer.push(word.toLowerCase())
    }
    if (hash[word] == 0){
        for (actual_neighbors of valid_neighbors([i, j], grid)){
            r = actual_neighbors[0]
            c = actual_neighbors[1]
            //console.log(actual_neighbors, visited, "checking what visted and neighbor node")
            if(visited[r][c] == false){
                dfs(grid, r,c, hash, visited, word, answer)
            }
        }
    }
    word = "" + word[-1]
    visited[i][j] = false
}

function valid_neighbors(node, grid){
    lst = []
    potential_neighbor = potential_neighbors(node)
    for (potential of potential_neighbor){
        // console.log(potential, "checking var potential")
        r = potential[0]
        c = potential[1]
        if(r >= 0 && c >= 0 && r<grid.length  && c < grid[0].length){
            valid_neighbor = [r, c]
            lst.push(valid_neighbor)
        }
    }
    // console.log(lst, "these r valid neighbors")
    return lst
}

function potential_neighbors(node){

    r = node[0];
    c = node[1];
    potential_neighbor = [
        [r - 1, c], // North
        [r + 1, c], // South
        [r, c + 1], // East
        [r, c - 1],  // West
        [r - 1, c - 1], // North West
        [r + 1, c - 1], // South West
        [r - 1, c + 1], // North East
        [r + 1, c + 1] // South East
    ];
    // console.log(potential_neighbor, "these r given potential neighbors")
    return potential_neighbor;
}

var grid = [['A', 'B', 'C', 'D'], ['E', 'F', 'G', 'H'], ['I', 'J', 'K', 'L'], ['A', 'B', 'C', 'D']]
dictionary = ['ABEF', 'AFJIEB', 'DGKD', 'DGKA']

console.log(exports.findAllSolutions(grid, dictionary));
