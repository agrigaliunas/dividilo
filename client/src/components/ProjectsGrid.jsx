import React from 'react';
import { ProjectCard } from './cards/ProjectCard';

export const ProjectsGrid = ({ projects, estado }) => {
    return (
        <div className="py-5 flex justify-center">
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 w-full">
                {projects.filter(p => p.state === estado).map(p => (
                    <ProjectCard project={p} />
                ))}
            </div>
        </div>
    );
}
