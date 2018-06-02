import { Component<% if(!!viewEncapsulation) { %>, ViewEncapsulation<% }%><% if(changeDetection !== 'Default') { %>, ChangeDetectionStrategy<% }%> } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: '<%= selector %>',<% if(inlineTemplate) { %>
  template: `<p-menubar [model]="items">
               <div>
                 <input type="text" pInputText placeholder="Search">
                 <button pButton label="Logout" icon="fa-sign-out"></button>
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
      icon: 'fa-file-o',
      items: [
        {
          label: 'New',
          icon: 'fa-plus',
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
      icon: 'fa-edit',
      items: [
        {label: 'Undo', icon: 'fa-mail-forward'},
        {label: 'Redo', icon: 'fa-mail-reply'}
      ]
    },
    {
      label: 'Help',
      icon: 'fa-question',
      items: [
        {
            label: 'Contents'
        },
        {
          label: 'Search',
          icon: 'fa-search',
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
      icon: 'fa-gear',
      items: [
        {
          label: 'Edit',
          icon: 'fa-refresh',
          items: [
            {label: 'Save', icon: 'fa-save'},
            {label: 'Update', icon: 'fa-save'},
          ]
        },
        {
          label: 'Other',
          icon: 'fa-phone',
          items: [
            {label: 'Delete', icon: 'fa-minus'}
          ]
        }
      ]
    },
    {
        label: 'Quit', icon: 'fa-minus'
    }
];
}