import React from 'react';

const EnquiryForm = () => (

    <form 
        method="post" 
        enctype="multipart/form-data" 
        id="wpforms-form-18" 
        action="/#wpforms-18" 
        class="wpforms-validate wpforms-form" 
        data-formid="18" 
        novalidate="novalidate"
        >
        <div class="field-container">
            <div 
                id="wpforms-18-field_0-container" 
                class="wpforms-field wpforms-field-name" 
                data-field-id="0"
                >
                <label class="wpforms-field-label" for="wpforms-18-field_0">
                    Your Details <span class="wpforms-required-label">*</span>
                </label>
                <div class="wpforms-field-row wpforms-field-large">
                    <div class="wpforms-field-row-block wpforms-first wpforms-one-half">
                        <input type="text" id="wpforms-18-field_0" class="wpforms-field-name-first wpforms-field-required" name="wpforms[fields][0][first]" placeholder="First Name" required="" aria-required="true" />
                        <label for="wpforms-18-field_0" class="wpforms-field-sublabel after wpforms-sublabel-hide">First</label>
                    </div>
                    <div class="wpforms-field-row-block wpforms-one-half">
                        <input type="text" id="wpforms-18-field_0-last" class="wpforms-field-name-last wpforms-field-required" name="wpforms[fields][0][last]" placeholder="Last Name" required="" aria-required="true" />
                        <label for="wpforms-18-field_0-last" class="wpforms-field-sublabel after wpforms-sublabel-hide">Last</label>
                    </div>
                </div>
            </div>
            <div id="wpforms-18-field_1-container" class="wpforms-field wpforms-field-email" data-field-id="1">
                <label class="wpforms-field-label wpforms-label-hide" for="wpforms-18-field_1">E-mail <span class="wpforms-required-label">*</span></label>
                <input type="email" id="wpforms-18-field_1" class="wpforms-field-large wpforms-field-required" name="wpforms[fields][1]" placeholder="Email address " required="" aria-required="true"/>
            </div>
            <div id="wpforms-18-field_2-container" class="wpforms-field wpforms-field-textarea" data-field-id="2">
                <label class="wpforms-field-label" for="wpforms-18-field_2">Message <span class="wpforms-required-label">*</span></label>
                <textarea id="wpforms-18-field_2" class="wpforms-field-medium wpforms-field-required" name="wpforms[fields][2]" placeholder="Looking forward to hearing from you." required="" aria-required="true"></textarea>
            </div>
        </div>
        <div class="wpforms-field wpforms-field-hp" id="wpform-field-hp">
            <label for="wpforms-field_hp" class="wpforms-field-label">Name</label>
            <input type="text" name="wpforms[hp]" id="wpforms-field_hp" class="wpforms-field-medium" />
        </div>
        <button 
            type="submit" 
            name="submit" 
            value="submit" 
            data-alt-text="Sending..."
            >
            Submit
        </button>
    </form>
        
);

export default EnquiryForm