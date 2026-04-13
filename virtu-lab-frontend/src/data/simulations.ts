/**
 * Simulation Mapping Data
 * -----------------------
 * Transforms the central laboratory configuration into a flattened format 
 * optimized for landing page rendering and catalog exploration.
 * ensures semantic consistency across subject-based laboratory views.
 */
import { LabType, labCatalog } from '../config/labsConfig';

export interface Simulation {
    name: string;
    subject: string;
    color: string;
    shadow: string;
    icon: string;
    labKey: LabType;
}

export const simulations: Simulation[] = (Object.keys(labCatalog) as LabType[]).map((labKey) => {
    const lab = labCatalog[labKey];
    return {
        name: lab.title,
        subject: lab.subject,
        color: lab.color,
        shadow: lab.shadow,
        icon: lab.icon,
        labKey,
    };
});
