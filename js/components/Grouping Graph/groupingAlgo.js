function algoGrouping(){
	var seuilCorrespondance = 0.5;
	var seuilFusion = 0.5;
	
	//----EPURATION------------
	var matrice = [	[1,1,1,1,0,0,0,0],
					[1,1,1,0,1,0,0,0],
					[1,1,1,1,0,0,0,0],
					[1,0,1,1,0,0,0,0],
					[0,1,0,0,1,1,1,1],
					[0,0,0,0,1,1,1,1],
					[0,0,0,0,1,1,1,0],
					[0,0,0,0,1,1,0,1]];
					  
	
	var bags = [];
	for(i=0; i<matrice.length;i++){ //for each row 
		var currentBag = [];
		for(j=0;j<matrice[i].length;j++){
			if(i == j){
				currentBag.push(j);
			}
			else if(matrice[i][j] == 1){
				var countIdenticalElt = 0;
				var countMaxElt = 0;
				
				for(k=0;k<matrice[j].length;k++){
					if(matrice[i][k] == 1){
						countMaxElt++;
						if(matrice[j][k] == 1){
							countIdenticalElt++;
						}
					}
				}
				if(countIdenticalElt/countMaxElt > seuilCorrespondance){
					currentBag.push(j);
				}
			}
		}
		bags.push(currentBag);
	}
	
	/**
	for(i=0;i<matrice.length;i++)
	{
		console.log(bags[i]);
	}
	*/
	//----------FUSION--------------
	//var i = 0;
	for(i=matrice.length-1;i>=0;i--){//pour chaque element, on essaie de le fusionner avec tout ceux du dessus
		var hasFused = 0;
		for(j=i;j>=0;j--){
			if(scoreFusionBag(bags[i],bags[j]) > seuilFusion){
				hasFused = 1;
				for(k=0;k<bags[i].length;k++){//we add the elements of bags[i] to bags[j] if they are not already present
					var present = 0;
					for(l=0;l<bags[j].length;l++){
						if(bags[i][k] == bags[j][l]){
							present = 1;
							break;
						}
					}
					if(present == 0){
						bags[j].push(bags[i][k]);
					}
				}
			}
		}
		if(hasFused == 1){
			bags.splice(i,1);
		}
	}
	for(i=0;i<bags.length;i++)
	{
		console.log(bags[i]);
	}
}

function scoreFusionBag(bag1,bag2){
	var countSimilaire = 0;
	for(i=0;i<bag1.length;i++){ //opti � faire eventuellement
		for(j=0;j<bag2.length;j++){
			if(bag1[i] == bag2[j]){
				countSimilaire++;
			}
		}
	}
	return countSimilaire/(Math.min(bag1.length,bag2.length));
}

algoGrouping(); 