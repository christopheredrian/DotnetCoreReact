﻿import React, { useState, FormEvent, useContext } from 'react';
import {
    Button, Segment, Form
} from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';

interface IProps {
    initialActivity: IActivity | undefined;
}


const ActivityForm: React.FC<IProps> = ({
    initialActivity,
}) => {

    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, cancelSelectedActivity, submitting } = activityStore;

    const initializeForm = () => {

        if (initialActivity) {
            return initialActivity;
        } else {
            return {
                id: '',
                title: '',
                description: '',
                date: '',
                category: '',
                city: '',
                venue: ''
            };
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm);


    const handleSubmit = () => {

        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid,
            };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };

    /**
     * @param event
     */
    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { name, value } = event.currentTarget;

        setActivity({
            ...activity,
            [name]: value
        });
    };


    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input name='title' placeholder={'Title'} value={activity.title} onChange={handleInputChange} />
                <Form.TextArea name='description' rows={2} placeholder={'Description'} value={activity.description} onChange={handleInputChange}/>
                <Form.Input name='category' placeholder={'Category'} value={activity.category} onChange={handleInputChange}/>
                <Form.Input name='date' type={'datetime-local'} placeholder={'Date'} value={activity.date} onChange={handleInputChange}/>
                <Form.Input name='city' placeholder={'City'} value={activity.city} onChange={handleInputChange}/>
                <Form.Input name='venue' placeholder={'Venue'} value={activity.venue} onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={cancelSelectedActivity} floated='right' type='button' content='Cancel' />
           </Form>
        </Segment>
    );
};


export default observer(ActivityForm);