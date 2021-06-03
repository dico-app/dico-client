@IF EXIST "%~dp0\..\..\cli\node.exe" (
  "%~dp0\..\node.exe"  "%~dp0\..\..\cli\bin\cli" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\..\cli\bin\cli" %*
)
