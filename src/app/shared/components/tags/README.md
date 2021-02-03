# Usage

Pattern:
`<app-shared-tags *ngIf="showTag" (closeTag)="closeTag()" [className]="'nameOfClass'"> Text </app-shared-tags>`

    Put your tag text in place of `Text` written in the Pattern above.

    In your code, you need also to have:

`showTag` variable for tag to be displayed. When true, tag is visible and when false, tag disappears.
`closeTag()` function to close Tag - it makes `showTag` value false.

`[className]` input is for concrete style. You need to indicate `nameOfClass` that is one of the names of classes listed below.

## Class Names

    blue tag with white text   -->   'white-text-tag'
    tag with blue text         -->   'blue-text-tag'
    tag with cyan text         -->   'cyan-text-tag'
    tag with green text        -->   'green-text-tag'
    tag with orange text       -->   'orange-text-tag'
    tag with pink text         -->   'pink-text-tag'
    tag with gray text         -->   'gray-text-tag'
