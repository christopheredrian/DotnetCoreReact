import { observable, action, computed } from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../models/Activity';
import agent from '../api/agent';

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
    @observable submitting = false;

    @computed get activitiesByDate() {
        return this.activities.sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date);
        });
    }

    @action loadActivities = async () => {

        this.loadingInitial = true;

        try {

            const activities = await agent.Activities.list();
            this.activities = activities.map(activity => {
                return {
                    ...activity,
                    date: activity.date.split('.')[0]
                }
            });

        } catch (error) {
            console.log(error);
        } finally {
            this.loadingInitial = false;
        }

    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
        this.editMode = false; 
    };

    @action createActivity = async (activity: IActivity) => {

        this.submitting = true;

        try {

            await agent.Activities.create(activity);

            this.selectedActivity = activity;
            this.activities.push(activity);
            this.editMode = false;

        } catch (e) {
            console.error(e);
        } finally {
            this.submitting = false; 
        }
    };

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    }

}

export default createContext(new ActivityStore());

