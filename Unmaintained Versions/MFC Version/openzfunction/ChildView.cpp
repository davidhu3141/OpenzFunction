// ChildView.cpp : CChildView 類別的實作
//

#include "stdafx.h"
#include "openzfunction.h"
#include "ChildView.h"
#define _USE_MATH_DEFINES
#include <cmath>
#include <windows.h>

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// CChildView

CChildView::CChildView()
{
}

CChildView::~CChildView()
{
}


BEGIN_MESSAGE_MAP(CChildView, CWnd)
	ON_WM_PAINT()
END_MESSAGE_MAP()



// CChildView 訊息處理常式

BOOL CChildView::PreCreateWindow(CREATESTRUCT& cs) 
{
	if (!CWnd::PreCreateWindow(cs))
		return FALSE;

	cs.dwExStyle |= WS_EX_CLIENTEDGE;
	cs.style &= ~WS_BORDER;
	cs.lpszClass = AfxRegisterWndClass(CS_HREDRAW|CS_VREDRAW|CS_DBLCLKS, 
		::LoadCursor(NULL, IDC_ARROW), reinterpret_cast<HBRUSH>(COLOR_WINDOW+1), NULL);

	return TRUE;
}



float siz=40.0;				//trans
float cy=10;
float cx=10;
float dx=390;
float dy=240;
int sx=-3;
int sy=-3;

int ChangeIndex[18]={3,0,1,3,2,1,6,7,2,8,9,3,10,11,0,4,5,1};

float sq(float x)					//square
{
	return x*x;
}

float d(float x,float y,float z,float xx,float yy,float zz)		//distance - square_root
{
	return sqrt(sq(x-xx)+sq(y-yy)+sq(z-zz));
}

float f(float x,float y)	//function
{
	//return 2*x/(x*x+y*y+1)+1;
	return (x * x + y * y)/ 4 + 1;
}

float sd(float x,float y,float xx,float yy)			//distance in the space
{
	return d(x,y,f(x,y),xx,yy,f(xx,yy));
}

float cosABC(float a,float b,float c)
{
	return (a*a+b*b-c*c)/(2*a*b);
}

float acosfabc(float x1,float y1,float x2,float y2,float x3,float y3)
{
	//o a b
	return acos(cosABC(sd(x1,y1,x2,y2),sd(x1,y1,x3,y3),sd(x2,y2,x3,y3)));
}

float mymin(float request[12])
{
	float a=request[0];
	for(int i=1;i<12;i++)
	{
		if(request[i]<a){
			a=request[i];
		}
	}
	return a;
}

void CChildView::OnPaint() 
{
	CPaintDC dc(this); // 繪製的裝置內容

	// TODO: 在此加入您的訊息處理常式程式碼

	//AllPoint
	float AllPoint[12][2];

	//AllArc
	float arc[10];

	//set array
	int i = 6;
	int j = 2;
			//arc
			//00 i+sx,j+sy
			//01 i+sx,j+sy+1
			//10 i+sx+1,j+sy
			//11 i+sx+1,j+sy+1
			arc[0]=acosfabc(i+sx,j+sy+1,i+sx,j+sy,i+sx+1,j+sy);
			arc[1]=acosfabc(i+sx,j+sy,i+sx,j+sy+1,i+sx+1,j+sy);
			arc[2]=acosfabc(i+sx+1,j+sy,i+sx,j+sy,i+sx,j+sy+1);
			arc[3]=acosfabc(i+sx+1,j+sy,i+sx+1,j+sy+1,i+sx,j+sy+1);
			arc[4]=acosfabc(i+sx+1,j+sy+1,i+sx+1,j+sy,i+sx,j+sy+1);
			arc[5]=acosfabc(i+sx,j+sy+1,i+sx+1,j+sy,i+sx+1,j+sy+1);
			arc[6]=atan(1/(f(i+sx,j+sy+1)-f(i+sx,j+sy)));
			arc[7]=atan(1/(f(i+sx,j+sy)-f(i+sx+1,j+sy)));
			arc[8]=atan(1/(f(i+sx+1,j+sy)-f(i+sx+1,j+sy+1)));
			arc[9]=atan(1/(f(i+sx+1,j+sy+1)-f(i+sx,j+sy+1)));
			arc[6]=arc[6]<0?arc[6]+M_PI:arc[6];
			arc[7]=arc[7]<0?arc[7]+M_PI:arc[7];
			arc[8]=arc[8]<0?arc[8]+M_PI:arc[8];
			arc[9]=arc[9]<0?arc[9]+M_PI:arc[9];
			//start!!
			AllPoint[3][0]=0;
			AllPoint[3][1]=0;
			//
			AllPoint[0][0]=sd(i+sx+1,j+sy+1,i+sx+1,j+sy);
			AllPoint[0][1]=0;
			//
			AllPoint[1][0]=sd(i+sx+1,j+sy,i+sx,j+sy+1)*cos(arc[3]);
			AllPoint[1][1]=sd(i+sx+1,j+sy,i+sx,j+sy+1)*sin(arc[3]);
			//
			AllPoint[2][0]=sd(i+sx+1,j+sy,i+sx,j+sy)*cos(arc[3]+arc[2]);
			AllPoint[2][1]=sd(i+sx+1,j+sy,i+sx,j+sy)*sin(arc[3]+arc[2]);
			//
			AllPoint[6][0]=AllPoint[1][0]+f(i+sx,j+sy+1)*cos(arc[3]+M_PI-arc[0]-arc[6]);
			AllPoint[6][1]=AllPoint[1][1]+f(i+sx,j+sy+1)*sin(arc[3]+M_PI-arc[0]-arc[6]);
			//		
			AllPoint[7][0]=AllPoint[2][0]+f(i+sx,j+sy)*cos(arc[3]+M_PI-arc[0]-arc[6]);
			AllPoint[7][1]=AllPoint[2][1]+f(i+sx,j+sy)*sin(arc[3]+M_PI-arc[0]-arc[6]);
			//
			AllPoint[8][0]=AllPoint[2][0]+f(i+sx,j+sy)*cos(arc[2]+arc[3]+M_PI-arc[7]);
			AllPoint[8][1]=AllPoint[2][1]+f(i+sx,j+sy)*sin(arc[2]+arc[3]+M_PI-arc[7]);
			//
			AllPoint[9][0]=AllPoint[3][0]+f(i+sx+1,j+sy)*cos(arc[2]+arc[3]+M_PI-arc[7]);
			AllPoint[9][1]=AllPoint[3][1]+f(i+sx+1,j+sy)*sin(arc[2]+arc[3]+M_PI-arc[7]);
			//
			AllPoint[10][0]=AllPoint[3][0]+f(i+sx+1,j+sy)*cos(-arc[8]);
			AllPoint[10][1]=AllPoint[3][1]+f(i+sx+1,j+sy)*sin(-arc[8]);
			//		
			AllPoint[11][0]=AllPoint[0][0]+f(i+sx+1,j+sy+1)*cos(-arc[8]);
			AllPoint[11][1]=AllPoint[0][1]+f(i+sx+1,j+sy+1)*sin(-arc[8]);
			//
			AllPoint[4][0]=AllPoint[0][0]+f(i+sx+1,j+sy+1)*cos(M_PI-arc[4]-arc[9]);
			AllPoint[4][1]=AllPoint[0][1]+f(i+sx+1,j+sy+1)*sin(M_PI-arc[4]-arc[9]);
			//
			AllPoint[5][0]=AllPoint[1][0]+f(i+sx,j+sy+1)*cos(M_PI-arc[4]-arc[9]);
			AllPoint[5][1]=AllPoint[1][1]+f(i+sx,j+sy+1)*sin(M_PI-arc[4]-arc[9]);//oh~ finally finished it!


			//move everybody			
			float tempcomp[12];
			for(int k=0;k<12;k++)
			{
				tempcomp[k]=AllPoint[k][0];
			}
			float bminx=mymin(tempcomp);
			for(int k=0;k<12;k++)
			{
				tempcomp[k]=AllPoint[k][1];
			}
			float bminy=mymin(tempcomp);
			//--let's move
			for(int k=0;k<12;k++)
			{
				AllPoint[k][0]-=bminx;
				AllPoint[k][1]-=bminy;
			}


			//draw!!
			//float tox=i*150+50;
			//float tox=(0.5*j+i)*300+10;
			float toy=cx;
			float tox=cy;

			dc.MoveTo(AllPoint[3][0]*siz+tox,AllPoint[3][1]*siz+toy);
			for(int a=0;a<18;a++)
			{
				//CPen Pen;
				//Pen.CreatePen(PS_SOLID,1,RGB(a*18,a*18,a*18));
				//dc.SelectObject(&Pen);
				dc.LineTo(AllPoint[ChangeIndex[a]][0]*siz+tox,AllPoint[ChangeIndex[a]][1]*siz+toy);
			}

			//index text
			CString str;
			str.Format(CString("%d"),i+sx);
			dc.TextOutW(AllPoint[ChangeIndex[0]][0]*siz+tox+10,AllPoint[ChangeIndex[0]][1]*siz+toy+10,str);
			str.Format(CString("%d"),j+sy);
			dc.TextOutW(AllPoint[ChangeIndex[0]][0]*siz+tox+30,AllPoint[ChangeIndex[0]][1]*siz+toy+10,str);
		
	/*

	*/
	// 不要呼叫描繪訊息的 CWnd::OnPaint()
}