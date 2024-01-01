module.exports = {
	drawAbout: drawAbout,
	drawOmen: drawOmen,
};

function drawAbout() {
	console.log(`
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
~~~~~ eri 1.0 | dev: migopp ~~~~~
\n       \`eri -h\` for help       `);
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