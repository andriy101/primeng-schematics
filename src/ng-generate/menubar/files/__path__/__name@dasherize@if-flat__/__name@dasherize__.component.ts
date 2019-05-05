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
  items: MenuItem[] = [
    {
      label: 'File',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
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
      icon: 'pi pi-fw pi-pencil',
      items: [
        {label: 'Delete', icon: 'pi pi-fw pi-trash'},
        {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
      ]
    },
    {
      label: 'Help',
      icon: 'pi pi-fw pi-question',
      items: [
        {
            label: 'Contents'
        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-search',
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
      icon: 'pi pi-fw pi-cog',
      items: [
        {
          label: 'Edit',
          icon: 'fa fa-refresh',
          items: [
            {label: 'Save', icon: 'pi pi-fw pi-save'},
            {label: 'Update', icon: 'pi pi-fw pi-save'},
          ]
        },
        {
          label: 'Other',
          icon: 'pi pi-fw pi-tags',
          items: [
            {label: 'Delete', icon: 'pi pi-fw pi-minus'}
          ]
        }
      ]
    },
    {
        label: 'Quit', icon: 'pi pi-fw pi-times'
    }
  ];
}