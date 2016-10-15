var geo = {
	
	d : function(x1, y1, x2, y2){
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	},
			
	cosOBC : function(o, b, c){
		return (b * b + c * c - o * o) / (2 * b * c);
	},
			
	// Sorry for using Array(2) to store XY coordinate.
	points : new Array(new Array(2), new Array(2), new Array(2), new Array(2)),

	// 'line' is incorrect, it should be 'line_length'
	lines : new Array(17),
			
	initLines : function(){
		geo.lines[1] = f(geo.points[0][0], geo.points[0][1]);
		geo.lines[2] = geo.d(geo.points[0][0], geo.points[0][1], geo.points[1][0], geo.points[1][1]);
		geo.lines[3] = f(geo.points[1][0], geo.points[1][1]);
		geo.lines[0] = geo.d(geo.lines[1], geo.lines[2], geo.lines[3], 0);
				
		geo.lines[5] = geo.lines[3];
		geo.lines[6] = geo.d(geo.points[1][0], geo.points[1][1], geo.points[2][0], geo.points[2][1]);
		geo.lines[7] = f(geo.points[2][0], geo.points[2][1]);
		geo.lines[4] = geo.d(geo.lines[5], geo.lines[6], geo.lines[7], 0);
				
		geo.lines[9] = geo.lines[7];
		geo.lines[10] = geo.d(geo.points[2][0], geo.points[2][1], geo.points[3][0], geo.points[3][1]);
		geo.lines[11] = f(geo.points[3][0], geo.points[3][1]);
		geo.lines[8] = geo.d(geo.lines[9], geo.lines[10], geo.lines[11], 0);
				
		geo.lines[13] = geo.lines[11];
		geo.lines[14] = geo.d(geo.points[3][0], geo.points[3][1], geo.points[0][0], geo.points[0][1]);
		geo.lines[15] = geo.lines[1];
		geo.lines[12] = geo.d(geo.lines[13], geo.lines[14], geo.lines[15], 0);
				
		geo.lines[16] = geo.d(geo.d(geo.points[0][0], geo.points[0][1], geo.points[2][0], geo.points[2][1]), geo.lines[7], 0, geo.lines[15]);
	},

	lastXY : {},
	segments : [],
	
	myMoveTo : function(x, y){
		geo.lastXY.x = x;
		geo.lastXY.y = y;
	},
			
	myLineTo : function(x, y){
		var tempLine = {};
		tempLine.x1 = geo.lastXY.x;
		tempLine.y1 = geo.lastXY.y;
		tempLine.x2 = x;
		tempLine.y2 = y;
		geo.segments.push(tempLine);
		geo.lastXY.x = x;
		geo.lastXY.y = y;
	},
			
	drawVirtual : function(){
		var minx=0;
		var miny=0;
		var maxx=0;
		var maxy=0;
		geo.segments = [];
		var direct;
		var curx;
		var cury;
		//---------------- beginPath();
		//A
		curx = 0;
		cury = 0;
		direct = 0;
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[0], cury + Math.sin(direct) * geo.lines[0]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//A
		curx = curx + Math.cos(direct) * geo.lines[0];
		cury = cury + Math.sin(direct) * geo.lines[0];
		direct = direct + Math.PI / 2 - Math.asin((geo.lines[1] - geo.lines[3]) / geo.lines[0]);
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[3], cury + Math.sin(direct) * geo.lines[3]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//A
		curx = curx + Math.cos(direct) * geo.lines[3];
		cury = cury + Math.sin(direct) * geo.lines[3];
		direct = direct + Math.PI / 2;
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[2], cury + Math.sin(direct) * geo.lines[2]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//A
		curx = curx + Math.cos(direct) * geo.lines[2];
		cury = cury + Math.sin(direct) * geo.lines[2];
		direct = direct + Math.PI / 2;
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[1], cury + Math.sin(direct) * geo.lines[1]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//
		curx = curx + Math.cos(direct) * geo.lines[1];
		cury = cury + Math.sin(direct) * geo.lines[1];
		direct = direct + Math.PI / 2 + Math.asin((geo.lines[1] - geo.lines[3]) / geo.lines[0]);
		//B
		curx = curx + Math.cos(direct) * geo.lines[0];
		cury = cury + Math.sin(direct) * geo.lines[0];
		direct = direct - Math.PI + Math.acos(geo.cosOBC(geo.lines[16], geo.lines[0], geo.lines[4]));
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[4], cury + Math.sin(direct) * geo.lines[4]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//B
		curx = curx + Math.cos(direct) * geo.lines[4];
		cury = cury + Math.sin(direct) * geo.lines[4];
		direct = direct + Math.PI / 2 - Math.asin((geo.lines[5] - geo.lines[7]) / geo.lines[4]);
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[7], cury + Math.sin(direct) * geo.lines[7]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//B
		curx = curx + Math.cos(direct) * geo.lines[7];
		cury = cury + Math.sin(direct) * geo.lines[7];
		direct = direct + Math.PI / 2;
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[6], cury + Math.sin(direct) * geo.lines[6]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//B
		curx = curx + Math.cos(direct) * geo.lines[6];
		cury = cury + Math.sin(direct) * geo.lines[6];
		direct = direct + Math.PI / 2;
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[5], cury + Math.sin(direct) * geo.lines[5]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//
		curx = curx + Math.cos(direct) * geo.lines[5];
		cury = cury + Math.sin(direct) * geo.lines[5];
		direct = direct + Math.PI / 2 + Math.asin((geo.lines[5] - geo.lines[7]) / geo.lines[4]);
		//C
		curx = curx + Math.cos(direct) * geo.lines[4];
		cury = cury + Math.sin(direct) * geo.lines[4];
		direct = direct - Math.PI + Math.acos(geo.cosOBC(geo.lines[0], geo.lines[4], geo.lines[16])) + Math.acos(geo.cosOBC(geo.lines[12], geo.lines[8], geo.lines[16]));
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[8], cury + Math.sin(direct) * geo.lines[8]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//C
		curx = curx + Math.cos(direct) * geo.lines[8];
		cury = cury + Math.sin(direct) * geo.lines[8];
		direct = direct + Math.PI / 2 - Math.asin((geo.lines[9] - geo.lines[11]) / geo.lines[8]);
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[11], cury + Math.sin(direct) * geo.lines[11]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//C
		curx = curx + Math.cos(direct) * geo.lines[11];
		cury = cury + Math.sin(direct) * geo.lines[11];
		direct = direct + Math.PI / 2;
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[10], cury + Math.sin(direct) * geo.lines[10]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//C
		curx = curx + Math.cos(direct) * geo.lines[10];
		cury = cury + Math.sin(direct) * geo.lines[10];
		direct = direct + Math.PI / 2;
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[9], cury + Math.sin(direct) * geo.lines[9]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//
		curx = curx + Math.cos(direct) * geo.lines[9];
		cury = cury + Math.sin(direct) * geo.lines[9];
		direct = direct + Math.PI / 2 + Math.asin((geo.lines[9] - geo.lines[11]) / geo.lines[8]);
		//D
		curx = curx + Math.cos(direct) * geo.lines[8];
		cury = cury + Math.sin(direct) * geo.lines[8];
		direct = direct - Math.PI + Math.acos(geo.cosOBC(geo.lines[16], geo.lines[8], geo.lines[12]));
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[12], cury + Math.sin(direct) * geo.lines[12]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//D
		curx = curx + Math.cos(direct) * geo.lines[12];
		cury = cury + Math.sin(direct) * geo.lines[12];
		direct = direct + Math.PI / 2 - Math.asin((geo.lines[13] - geo.lines[15]) / geo.lines[12]);
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[15], cury + Math.sin(direct) * geo.lines[15]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//D
		curx = curx + Math.cos(direct) * geo.lines[15];
		cury = cury + Math.sin(direct) * geo.lines[15];
		direct = direct + Math.PI / 2;
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[14], cury + Math.sin(direct) * geo.lines[14]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//D
		curx = curx + Math.cos(direct) * geo.lines[14];
		cury = cury + Math.sin(direct) * geo.lines[14];
		direct = direct + Math.PI / 2;
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[13], cury + Math.sin(direct) * geo.lines[13]);
		minx = Math.min(curx, minx);
		miny = Math.min(cury, miny);
		maxx = Math.max(curx, maxx);
		maxy = Math.max(cury, maxy);
		//
		curx = 0;
		cury = 0;
		direct = -Math.acos(geo.cosOBC(geo.lines[4], geo.lines[0], geo.lines[16]));
		geo.myMoveTo(curx, cury);
		geo.myLineTo(curx + Math.cos(direct) * geo.lines[16], cury + Math.sin(direct) * geo.lines[16]);
		minx = Math.min(curx+Math.cos(direct), minx);
		miny = Math.min(cury+Math.sin(direct), miny);
		maxx = Math.max(curx+Math.cos(direct), maxx);
		maxy = Math.max(cury+Math.sin(direct), maxy);
		//---------------- endPath();
		geo.segments.minx=minx;
		geo.segments.miny=miny;
		geo.segments.maxx=maxx;
		geo.segments.maxy=maxy;
		return geo.segments;
	}
};
