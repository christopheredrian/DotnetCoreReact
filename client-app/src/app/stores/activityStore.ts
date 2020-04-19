import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/Activity';
import agent from '../api/agent';

configure({ enforceActions: 'always' });
class ActivityStore {

    @observable activityRegistry = new Map<string, IActivity>();
    //@observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {

        return Array.from(this.activityRegistry.values()).sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date);
        })

    }

    @action loadActivities = async () => {

        this.loadingInitial = true;

        try {

            const activities = await agent.Activities.list();

            runInAction('loading activities',() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
                    this.activityRegistry.set(activity.id, activity);
                });
            });
          

        } catch (error) {
            console.log(error);
        } finally {

            runInAction(() => {
                this.loadingInitial = false;
            });
        }

    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false; 
    };

    @action createActivity = async (activity: IActivity) => {

        this.submitting = true;

        try {

            await agent.Activities.create(activity);

            runInAction('Updating Activity',() => {
                this.selectedActivity = activity;
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
            });

        } catch (e) {
            console.error(e);
        } finally {
            runInAction(() => { this.submitting = false }); 
        }
    };

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    }

    @action openEditMode = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
        this.editMode = false;
    }

    @action editActivity = async (activity: IActivity) => {

        this.submitting = true; 

        try {

            await agent.Activities.update(activity);

            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
            });

        } catch (e) {
            console.log(e);
        } finally {

            runInAction(() => {
                this.editMode = false;
                this.submitting = false;
            });

        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {

        this.submitting = true;
        this.target = event.currentTarget.name;

        try {
            await agent.Activities.delete(id);

            runInAction(() => {
                this.activityRegistry.delete(id);
            });
        } catch (e) {
            console.log(e);
        } finally {

            runInAction(() => {
                this.submitting = false;
                this.target = '';
            });
            
        }

    }


}

export default createContext(new ActivityStore());

