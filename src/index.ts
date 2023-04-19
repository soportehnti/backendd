import App from './app';
import { AreaRoute } from './routes/area.route';
import { AuthRoute } from './routes/auth.route';
import { CityRoute } from './routes/city.route';
import { ClientRoute } from './routes/client.route';
import { CommentRoute } from './routes/comment.route';
import { CountryRoute } from './routes/country.route';
import { FileRoute } from './routes/file.route';
import { IncidentTypeRoute } from './routes/incident-type.route';
import { PermissionRoute } from './routes/permission.route';
import { PriorityRoute } from './routes/priority.route';
import { ReportRoute } from './routes/report.route';
import { RoleRoute } from './routes/role.route';
import { StateRoute } from './routes/state.route';
import { StatusRoute } from './routes/status.route';
import { TicketRoute } from './routes/ticket.route';
import { UserRoute } from './routes/user.route';

const app = new App([
    new AuthRoute(),
    new UserRoute(),
    new RoleRoute(),
    new PermissionRoute(),
    new ClientRoute(),
    new CountryRoute(),
    new StateRoute(),
    new CityRoute(),
    new AreaRoute(),
    new TicketRoute(),
    new PriorityRoute(),
    new StatusRoute(),
    new IncidentTypeRoute(),
    new CommentRoute(),
    new ReportRoute(),
    new FileRoute(),
]);

app.listen();
