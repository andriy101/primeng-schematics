import { Component<% if(!!viewEncapsulation) { %>, ViewEncapsulation<% }%><% if(changeDetection !== 'Default') { %>, ChangeDetectionStrategy<% }%> } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: '<%= selector %>',<% if(inlineTemplate) { %>
  template: `<p-menubar [model]="items">
               <div>
                 <input type="text" pInputText placeholder="Search">
                 <button pButton label="Logout" icon="pi pi-fw pi-sign-out"></button>
               </div>
             </p-menubar>`,<% } else { %>
  templateUrl: './<%= dasherize(name) %>.component.html',<% } if(inlineStyle) { %>
  styles: []<% } else { %>
  styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']<% } %><% if(!!viewEncapsulation) { %>,
  encapsulation: ViewEncapsulation.<%= viewEncapsulation %><% } if (changeDetection !== 'Default') { %>,
  changeDetection: ChangeDetectionStrategy.<%= changeDetection %><% } %>
})
export class <%= classify(name) %>Component {
  cssClass = 'p-lg-4 p-md-6 p-sm-12';
}