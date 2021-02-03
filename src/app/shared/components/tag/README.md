# Usage

Pattern:
`<app-shared-tag *ngIf="showTag" (closeClicked)="closeTag()" [color]="'white'"> Text </app-shared-tag>`

-- Put your tag text in place of 'Text' written in the Pattern above.
-- You can give the tag `height` and `width` of your choice (you can give it a class or use style binding).

In your code, you need also to have:

-- `showTag` variable for tag to be displayed. When true, tag is visible and when false, tag disappears.
-- `closeTag()` function to close Tag - it makes `showTag` value false.

`[color]` input is for concrete style. You need to indicate `color` that can be one of the colors listed below.
For default style, use empty string like this: `[color]="''"` or `[color]="'default'"`;

## Colors For Tag

    For blue tag with white text   -->   'white'
    For tag with blue text         -->   'blue'
    For tag with cyan text         -->   'cyan'
    For tag with green text        -->   'green'
    For tag with orange text       -->   'orange'
    For tag with pink text         -->   'pink'
    For tag with gray text         -->   'gray'
