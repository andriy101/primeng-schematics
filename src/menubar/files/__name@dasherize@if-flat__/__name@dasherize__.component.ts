import { Component<% if(!!viewEncapsulation) { %>, ViewEncapsulation<% }%><% if(changeDetection !== 'Default') { %>, ChangeDetectionStrategy<% }%> } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: '<%= selector %>',<% if(inlineTemplate) { %>
  template: `<p-menubar [model]="items">
               <div>
                 <input type="text" pInputText placeholder="Search">
                 <button pButton label="Logout" icon="fa fa-sign-out"></button>
               </div>
             </p-menubar>`,<% } else { %>
  templateUrl: './<%= dasherize(name) %>.component.html',<% } if(inlineStyle) { %>
  styles: []<% } else { %>
  styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']<% } %><% if(!!viewEncapsulation) { %>,
  encapsulation: ViewEncapsulation.<%= viewEncapsulation %><% } if (changeDetection !== 'Default') { %>,
  changeDetection: ChangeDetectionStrategy.<%= changeDetection %><% } %>
})
export class <%= classify(name) %>Component {
  items: MenuItem[] = [
    {
      label: 'File',
      icon: 'fa fa-file-o',
      items: [
        {
          label: 'New',
          icon: 'pi pi-plus',
          items: [
            {label: 'Project'},
            {label: 'Other'},
          ]
        },
        {label: 'Open'},
        {separator: true},
        {label: 'Quit'}
      ]
    },
    {
      label: 'Edit',
      icon: 'fa fa-edit',
      items: [
        {label: 'Undo', icon: 'fa fa-mail-forward'},
        {label: 'Redo', icon: 'fa fa-mail-reply'}
      ]
    },
    {
      label: 'Help',
      icon: 'fa fa-question',
      items: [
        {
            label: 'Contents'
        },
        {
          label: 'Search',
          icon: 'fa fa-search',
          items: [
            {
              label: 'Text',
              items: [
                {
                  label: 'Workspace'
                }
              ]
            },
            {
              label: 'File'
            }
        ]}
      ]
    },
    {
      label: 'Actions',
      icon: 'fa fa-gear',
      items: [
        {
          label: 'Edit',
          icon: 'fa fa-refresh',
          items: [
            {label: 'Save', icon: 'fa fa-save'},
            {label: 'Update', icon: 'fa fa-save'},
          ]
        },
        {
          label: 'Other',
          icon: 'fa fa-phone',
          items: [
            {label: 'Delete', icon: 'fa fa-minus'}
          ]
        }
      ]
    },
    {
        label: 'Quit', icon: 'fa fa-minus'
    }
];
}