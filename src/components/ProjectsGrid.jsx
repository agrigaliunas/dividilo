import React from 'react';
import { ProjectCard } from './ProjectCard';

export const ProjectsGrid = ({ projects, estado }) => {
    return (
        <div className="py-5">
            <div className="flex flex-wrap gap-6">
                {projects.filter(p => p.estado === estado).map(p => (
                    <ProjectCard project={p} />
                ))}
            </div>
        </div>
    );
}
