CALL sass "core\dropdowns\style\index.scss" "core\dropdowns\style\build\index.css"
CALL sass "core\dropdowns\disabled\style\index.scss" "core\dropdowns\disabled\style\build\index.css"
CALL sass "core\dropdowns\field\style\index.scss" "core\dropdowns\field\style\build\index.css"
CALL sass "core\dropdowns\select\style\index.scss" "core\dropdowns\select\style\build\index.css"
CALL sass "style\index.scss" "style\build\index.css"
CALL tsc -p "core\logic\tsconfig.json"
CALL PAUSE