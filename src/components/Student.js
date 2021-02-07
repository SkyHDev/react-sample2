import React, { Component } from 'react';
import styles from '../styles/student.module.css';

class Student extends Component {

    averageGrade = (grades) => {
        var sum = 0;
        grades.forEach(element => {
            sum += parseFloat(element);
        });
     
        let aver = sum / grades.length;
        return (aver).toFixed(3);
    }

    render() {
        return (
            <div className="border-bottom p-3 media">
                <img width="128" height="128" src={this.props.data.pic} alt="Personal Img" className="align-self-start border rounded-circle mr-4 mt-3" />
                <div className="media-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">{this.props.data.firstName} {this.props.data.lastName}</h3>
                        <h1 className="text-secondary mb-0">+</h1>
                    </div>
                    <div className="pl-4">
                        <p className={styles.privateInfo}>Email: {this.props.data.email}</p>
                        <p className={styles.privateInfo}>Company: {this.props.data.company}</p>
                        <p className={styles.privateInfo}>Skill: {this.props.data.skill}</p>
                        <p className={styles.privateInfo}>Average: {this.averageGrade(this.props.data.grades)}%</p>
                        <div className="mt-2">
                            <input placeholder="Add a tag" type="text" className="border-bottom form-control" />
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}

export default Student;