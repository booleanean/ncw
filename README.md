This will add little corners for the checked boxes. Could be useful for tristate stuff too, mark both corners for 100+ words?
label {
position: relative;
}
label:has(:checked)::after {
position:absolute;
content: '';
right: 0;
height: 10px;
aspect-ratio: 1;
clip-path: polygon(0 0, 100% 0, 100% 100%);
background: #777;
}
