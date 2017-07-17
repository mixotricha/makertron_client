

slat_width = 8/4; 
slat_height = 5/16;
slat_length = 72;
slat_count = 7; 

for ( y = [0:slat_width:slat_width*slat_count] ) { 
	translate([y+(slat_width*slat_count)/2,0,0]) 
	cube( [slat_width,slat_height,slat_length], center=true ); 
}

cross_width = slat_width * slat_count; 
cross_height = 5/8; 
cross_length = 1+(1/4); 
cross_count = 4; 
for ( z = [0:cross_length:cross_length*cross_count]){ 
	translate([cross_width/2,0,slat_length+z])
	cube( [cross_width,cross_height,cross_length],center=true); 
}







