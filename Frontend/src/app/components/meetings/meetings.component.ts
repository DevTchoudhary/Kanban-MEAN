import { Component } from '@angular/core'; 
// Importing the Component class from Angular core to define this Angular component.

import { trigger, transition, style, animate } from '@angular/animations'; 
// Importing Angular animations utilities. 
// 'trigger' defines a named animation, 
// 'transition' defines the animation's start and end points, 
// 'style' applies CSS styles, and 
// 'animate' specifies how the transition will be executed.

@Component({
  selector: 'app-meetings', 
  // Defines a selector 'app-meetings', which is the HTML tag used to insert this component.

  standalone: true, 
  // Makes this component standalone, meaning it doesn’t need to be declared in a module.

  imports: [], 
  // List of external modules or components to import. In this case, it is empty.

  templateUrl: './meetings.component.html', 
  // Links the HTML file where the template (view) for this component is defined.

  styleUrl: './meetings.component.css', 
  // Links the CSS file for this component to style its view.

  animations: [
    trigger('fadeIn', [ 
      // Declaring an animation trigger named 'fadeIn'.
      
      transition(':enter', [ 
        // Defines the transition when an element enters the DOM (component is loaded).

        style({ opacity: 0 }), 
        // Initial style of the element is fully transparent (opacity 0).

        animate('500ms ease-in', style({ opacity: 1 })) 
        // Specifies that the element will animate to full opacity (opacity 1) over 500ms with an ease-in effect.
      ])
    ])
  ]
  // The entire animations array contains logic for creating a fade-in effect when the component is displayed.
})
export class MeetingsComponent { 
  // Defines the 'MeetingsComponent' class where the logic for this component resides.

  createMeeting() { 
    // Function to create a new meeting using Google Meet.

    const meetUrl = 'https://meet.google.com/new'; 
    // The URL for creating a new Google Meet session.

    window.open(meetUrl, '_blank'); 
    // Opens the 'meetUrl' in a new browser tab when this function is called.
  }
}
