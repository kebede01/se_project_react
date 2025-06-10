### save current changes
-git stash 
###  Apply most recect and delete itfrom the list
-git stash pop  
### Apply and don't delete
-git stash apply 
### To See all lists 
 -git stash list  
###  Apply a specific stash
-git  stash apply stash@ (2) 
###  Delets a specific stash
 -git stash drop stash@(1) 
### stash with message
- git stash save "work in progress on header styling"
