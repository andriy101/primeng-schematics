import { Component, OnInit<% if(!!viewEncapsulation) { %>, ViewEncapsulation<% }%><% if(changeDetection !== 'Default') { %>, ChangeDetectionStrategy<% }%> } from '@angular/core';

import { TreeNode, Message } from 'primeng/api';

@Component({
  selector: '<%= selector %>',<% if(inlineTemplate) { %>
  template: `<p-growl [(value)]="messages"></p-growl>

            <h3 class="first">Advanced</h3>
            <p>Organization with advanced customization.</p>
            <p-organizationChart [value]="data" selectionMode="single" [(selection)]="selectedNode" (onNodeSelect)="onNodeSelect($event)"
                styleClass="company">
                <ng-template let-node pTemplate="person">
                    <div class="node-header ui-corner-top">{node.label}</div>
                    <div class="node-content">
                        <img src="https://raw.githubusercontent.com/primefaces/primeng/master/src/assets/showcase/images/demo/organization/j{node.data.avatar}" width="32">
                        <div>{node.data.name}</div>
                    </div>
                </ng-template>
                <ng-template let-node pTemplate="department">
                    {node.label}
                </ng-template>
            </p-organizationChart>
            
            <h3>Basic</h3>
            <p>Hierarchical data with zero configuration.</p>
            <p-organizationChart [value]="data2"></p-organizationChart>`,<% } else { %>
  templateUrl: './<%= dasherize(name) %>.component.html',<% } if(inlineStyle) { %>
  styles: [`
    .company.ui-organizationchart .ui-organizationchart-node-content.ui-person {
      padding: 0;
      border: 0 none;
    }
    
    .node-header,.node-content {
      padding: .5em .7em;
    }
    
    .node-header {
      background-color: #495ebb;
      color: #ffffff;
    }
    
    .node-content {
      text-align: center;
      border: 1px solid #495ebb;
    }
    
    .node-content img {
      border-radius: 50%;
    }
    
    .department-cfo {
      background-color: #7247bc;
      color: #ffffff;
    }
    
    .department-coo {
      background-color: #a534b6;
      color: #ffffff;
    }
    
    .department-cto {
      background-color: #e9286f;
      color: #ffffff;
    }
    
    .ui-person .ui-node-toggler {
      color: #495ebb !important;
    }
    
    .department-cto .ui-node-toggler {
      color: #8a0a39 !important;
    }
`]<% } else { %>
  styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']<% } %><% if(!!viewEncapsulation) { %>,
  encapsulation: ViewEncapsulation.<%= viewEncapsulation %><% } if (changeDetection !== 'Default') { %>,
  changeDetection: ChangeDetectionStrategy.<%= changeDetection %><% } %>
})
export class <%= classify(name) %>Component implements OnInit {
  data: TreeNode[];
  selectedNode: TreeNode; 
  messages: Message[];
  
  ngOnInit() {
    this.data = [{
      label: 'CEO',
      type: 'person',
      styleClass: 'ui-person',
      expanded: true,
      data: {name:'Walter White', 'avatar': 'walter.jpg'},
      children: [
        {
          label: 'CFO',
          type: 'person',
          styleClass: 'ui-person',
          expanded: true,
          data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
          children:[{
            label: 'Tax',
            styleClass: 'department-cfo'
          },
          {
            label: 'Legal',
            styleClass: 'department-cfo'
          }],
        },
        {
          label: 'COO',
          type: 'person',
          styleClass: 'ui-person',
          expanded: true,
          data: {name:'Mike E.', 'avatar': 'mike.jpg'},
          children:[{
            label: 'Operations',
            styleClass: 'department-coo'
          }]
        },
        {
          label: 'CTO',
          type: 'person',
          styleClass: 'ui-person',
          expanded: true,
          data: {name:'Jesse Pinkman', 'avatar': 'jesse.jpg'},
          children:[{
            label: 'Development',
            styleClass: 'department-cto',
            expanded: true,
            children:[{
              label: 'Analysis',
              styleClass: 'department-cto'
            },
            {
              label: 'Front End',
              styleClass: 'department-cto'
            },
            {
              label: 'Back End',
              styleClass: 'department-cto'
            }]
          },
          {
            label: 'QA',
            styleClass: 'department-cto'
          },
          {
            label: 'R&D',
            styleClass: 'department-cto'
          }]
        }
      ]
    }];
  }
  
  onNodeSelect(event) {
    this.messages = [{severity: 'success', summary: 'Node Selected', detail: event.node.label}];
  }
}