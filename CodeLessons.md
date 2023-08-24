Short Points :

1. Use .gitignore for nodemodules to avoid large size 
2. Rant Chat Gpt for Wrong code it often self corrects , Chat gpt till now has intermitent coding issue cant code in one go soon it would be solved due to cureent token issue.Its output is Non-Deterministics 
3. Debug the webconsol with F12 and paste  error logs into Gpt for code resolution
4. You will see Only files when running on to already running port and not the webpage .
Solution 1: Use differnt port like 5000
Solution 2: Stop the process on the port and restart to activate the webpage 
5. Send Button Not appending 1) adding a log output to check id its listening or not 
                             2)Send bunch of Ids and just verify if those ids actually verify in top 

 6. Add Nodemon to start script in package.json to auto load as to restart the server everytime is painful
 7. Css tag is the shortest way to insert Css code into Html 
 8. Handle bugs with log 
 




DEEP Lessons Below 


Lesson 1:
In most cases, you should not add the node_modules directory to your version control system (e.g., Git). Including the node_modules directory in your repository can lead to several issues:

Large Repository Size: node_modules can contain a large number of files, and including them in your repository can make it significantly larger, which can slow down cloning, pulling, and pushing the repository.

Version Conflicts: Different dependencies might require different versions of the same package. Storing node_modules could lead to version conflicts and make it harder to manage dependencies.

Redundancy: Since package dependencies are already defined in your package.json file, including node_modules is redundant.

To avoid these issues, follow these steps:

Use a .gitignore File: Create a .gitignore file in your project's root directory. In this file, list the directories and files that you want Git to ignore. You can add the following line to ignore the node_modules directory:

node_modules/

Lesson 2:
Commit package.json and package-lock.json: Both these files contain the information needed to install the correct versions of your project's dependencies. Commit these files, and anyone who clones your repository can run npm install to get the required dependencies.

Lesson 3:
Dependencies on Deployment: When deploying your project to a server or hosting platform, make sure to install the dependencies using npm install or equivalent. Hosting platforms often use the information in your package.json to install the correct dependencies.

To summarize, while it's a good practice to commit your package.json and package-lock.json files, you should avoid committing the node_modules directory to keep your repository clean, manageable, and free from potential issues related to large file storage and version conflicts.