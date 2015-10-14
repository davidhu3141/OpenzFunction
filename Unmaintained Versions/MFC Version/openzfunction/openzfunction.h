// openzfunction.h : openzfunction 應用程式的主標頭檔
//
#pragma once

#ifndef __AFXWIN_H__
	#error "對 PCH 包含此檔案前先包含 'stdafx.h'"
#endif

#include "resource.h"       // 主要符號


// CopenzfunctionApp:
// 請參閱實作此類別的 openzfunction.cpp
//

class CopenzfunctionApp : public CWinApp
{
public:
	CopenzfunctionApp();


// 覆寫
public:
	virtual BOOL InitInstance();

// 程式碼實作

public:
	afx_msg void OnAppAbout();
	DECLARE_MESSAGE_MAP()
};

extern CopenzfunctionApp theApp;