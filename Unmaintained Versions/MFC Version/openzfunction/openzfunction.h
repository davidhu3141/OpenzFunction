// openzfunction.h : openzfunction ���ε{�����D���Y��
//
#pragma once

#ifndef __AFXWIN_H__
	#error "�� PCH �]�t���ɮ׫e���]�t 'stdafx.h'"
#endif

#include "resource.h"       // �D�n�Ÿ�


// CopenzfunctionApp:
// �аѾ\��@�����O�� openzfunction.cpp
//

class CopenzfunctionApp : public CWinApp
{
public:
	CopenzfunctionApp();


// �мg
public:
	virtual BOOL InitInstance();

// �{���X��@

public:
	afx_msg void OnAppAbout();
	DECLARE_MESSAGE_MAP()
};

extern CopenzfunctionApp theApp;