module.exports = {
    drawAbout: drawAbout,
    drawOmen: drawOmen,
};

const chalk = require('chalk');
const about = chalk.red;

function drawAbout() {
    console.log(about(`

   ▄████████    ▄████████  ▄█  
  ███    ███   ███    ███ ███  
  ███    █▀    ███    ███ ███▌ 
 ▄███▄▄▄      ▄███▄▄▄▄██▀ ███▌ 
▀▀███▀▀▀     ▀▀███▀▀▀▀▀   ███▌ 
  ███    █▄  ▀███████████ ███  
  ███    ███   ███    ███ ███  
  ██████████   ███    ███ █▀   
               ███    ███      
\n~~~ An Elden Ring CLI utility ~~~
---------------------------------
~~~~~ eri 1.1 | dev: migopp ~~~~~
\n       \`eri -h\` for help       `));
}

function drawOmen() {
    console.log(`
                                                                              ███▓  
                                                                         ████▓█ 
                                                                         ███▓██ 
                                                                 █▓▓▓███▓██▓▓█  
                                                                ▓▓▓▓██████▓███  
                                                          ██  █████▓▓▓██████    
                                                       ██▓▓████████▓███         
                                                    ▓▓▓▓▓▓███████████           
                                                  ▓▓▓▓██████████████            
                                               █▓▓▓▓████████████████            
                                             ██▓▓███████████                    
                                           ██▓▓██▓▓████                         
                                         ███████████                            
                                        █████████                               
                                      █████████                                 
                                    █████████                                   
                                  █████████                                     
                                 █████████                                      
                               █████████                                        
                              ████████                                          
                             ████████                                           
                           ████████                                             
                          ███████                                               
                         ███████                                                
                         ██████                                                 
                       ███████                                                  
                      ████████                                                  
                    ████████         Have it writ upon thy meager grave:        
                   ███████           Felled by King Morgott! Last of all kings. 
                  ███████                                                       
                 ███████                                                        
               ████████                                                         
              ███████                                                           
            ███████                                                             
          ███████                                                               
         ██████                                                                 
        █████                                                                   
       █████                                                                    
     █████                                                                      
    █████                                                                       
   █████                                                                        
 █████                                                                          
█████
`);
}
