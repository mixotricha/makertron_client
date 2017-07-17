
module half_cylinder(radius=0,height=0) { 
    difference(){
        translate([0,0,-height/2])
        cylinder( r = radius , h = height ); 
        translate([-radius,0,-(height+2)/2]) 
        cube( [ radius*2 , radius*2 , height+2] ); 
   }
}

module d_part(ra=0,he=0) { 
 difference() { 
 union(){
 difference(){
    union(){
        difference() { 
            half_cylinder(radius=ra,height=he); 
            half_cylinder(radius=ra-5,height=he+1); 
        }
        translate([-ra,0,-he/2])
        cube( [ ra*2 , 5 , he ] ); 
    } 
    for ( r = [-8:180/7.4:195]){
            rotate([0,0,-r]){    
                translate( [ ra-2.5 , 0 , -5]) 
                cylinder( r = 1.5 , h = 10) ;
            } 
        }
    }}
    for ( x = [-12:6:6*2]) { 
        translate([-x,2.5,-2.5])
        cylinder( r = 1.5 , h = 10); 
    }}
}

module triangle(){
    base = 40/2; 
    apex = 70; 
    scale = 1.5;
    ox = (-base + base + 0    )/3; 
    oy = ( 0    + 0    + apex )/3; 
    color([0,0,1])
    difference(){
        translate([-ox,-oy,0])
            linear_extrude( height = 1 )
                polygon( points=[
                     [-base,0],
                     [base,0],[0,apex]], faces=[[0,1,2]] ); 
    
    
   translate([-ox/scale,-oy/scale,0])
    linear_extrude( height = 2 )
        polygon( points=[
                     [-base/scale,0],
                     [base/scale,0],[0,apex/scale]], faces=[[0,1,2]] ); 
    
    }
}

translate([0,-20,0])
d_part(ra=20,he=1); 

rotate([0,0,120]) {
    translate([-3,-14.5,0])
    d_part(ra=20,he=1); 
}    

rotate([0,0,-120]) {
    translate([3,-14.5,0])
    d_part(ra=20,he=1); 
} 

translate([0,40,0])
triangle(); 