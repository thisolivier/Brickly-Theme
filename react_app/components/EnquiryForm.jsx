import React from 'react';


class EnquiryForm extends React.Component {

    handleSubmit(event) {
        event.preventDefault();
        if (!event.target.checkValidity()){
            alert("Please fill in all fields. Or just call (+44)7967048190")
            return
        }
        const data = new FormData(event.target);
        fetch('/wp-json/brickly/v1/enquiry', {
            method: 'POST',
            body: data,
        });
        event.target.reset()
    }

    render() {
        return(
            <div>
            <form className="enquiryForm" onSubmit={this.handleSubmit} noValidate>
                <div>
                    <div>
                        <label for="18-field_0">
                            Your Details
                        </label>
                        <div className="field-row">
                            <div className="row-block one-half">
                                <input type="text" id="18-field_0" name="first_name" placeholder="First Name" required aria-required="true" />
                                <label for="18-field_0" className="hide">First</label>
                            </div>
                            <div className="row-block one-half">
                                <input type="text" id="18-field_0-last" name="last_name" placeholder="Last Name" required aria-required="true" />
                                <label for="18-field_0-last" className="hide">Last</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="hide" for="18-field_1">E-mail</label>
                        <input type="email" id="18-field_1" name="email" placeholder="Email address" required aria-required="true"/>
                    </div>
                    <div>
                        <label for="wpforms-18-field_2">Message</label>
                        <textarea id="wpforms-18-field_2" name="message" placeholder="Looking forward to hearing from you." required aria-required="true"></textarea>
                    </div>
                </div>
                <button type="submit" name="submit" value="submit">
                    Submit
                </button>
            </form>
            </div>
        )
    }
}

export default EnquiryForm