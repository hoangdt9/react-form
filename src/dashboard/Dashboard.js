import React, { Component, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import PageTitle from '../AssurePageTitle';
import Tables from '../AssureTable';
import Card from '../AssureCard';
import FirmUserForm from '../AssureFirmUserForm';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssureClientOnboard from '../AssureClientOnboardWizard';
import AssureTallyImportForm from '../AssureTallyImportForm';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Tooltip from '@material-ui/core/Tooltip';
// import { Link as NavLink} from 'react-router-dom';
// import Link from '@material-ui/core/Link';
import { Chip, Button, FormControl } from '@material-ui/core';
import MultiSelect from '../../components/MultiSelect/MultiSelect';
import newTheme from '../../containers/App/theme';
import {
    useIsFetching,
    useIsMutating,
    useMutation,
    useQueryClient,
} from 'react-query';
import useToggleStatus from '../../containers/AssureDashboard/SuperAdminDashboardAPI';

import { Switch, FormGroup, Icon } from '@material-ui/core';

const buttonTheme = createMuiTheme({
    overrides: {
        MuiIconButton: {
            root: {
                padding: '80px',
            },
        },
    },
});



const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 2000,
        color: '#fff',
    },
    // tableStatusLegendDiv: {
    //   marginTop: '-4px',
    //   marginLeft: '12px',
    // },
    statusLegendSpan: {
        marginLeft: '15px',
        fontSize: '20px',
    },
}));


let showContentFlagVariable = 'none';

let transformedUsers = [];

export default function FirmAdminDashboard({
    roles,
    addFirmUser,
    clients = [],
    users = [],
    parseClientXml,
    UploadITR,
    clientJson,
    addClient,
    getClientUsers,
    metadata,
    getClientDetails,
    clientDetails,
    resetCurrentClient,
    clientUsers = [],
    addClientUser,
    loader,
    getClientPreferences,
    addClientPreferences,
    clientPreferences,
    addGroup,
    groups,
    error,
    resetError,
    userViews,
    host_site_url,
    xmlFLag,
    clientPreferenceChecklist,
    checklist,
    cleanChecklist,
    auditorClientList,
    getAuditorClientList,
    getCheckpoints,
    firmCheckpoints,
    showContentFlag,
    downloadITRXml,
}) {
    const [openAddUser, setOpenAddUser] = React.useState(false);
    const [addClientAction, setAddClientAction] = React.useState(false);
    const [openImportTally, setOpenImportTally] = React.useState(false);
    const [clientName, setClientName] = React.useState(null);
    const [clientFileNumber, setClientFileNumber] = React.useState(null);
    const [openAddClient, setOpenAddClient] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(false);
    const [firmUserToEdit, setFirmUserToEdit] = React.useState(null);
    const [isFirmUserUpdate, setIsFirmUserUpdate] = React.useState(false);
    const [refreshState, setRefreshState] = React.useState(true);
    const updateUI = () => {
        console.log('Re-rendering Firm Dashboard');
        setRefreshState(!refreshState);
    };

    {
        /* Client Table */
    }


    {
        /* This is the the function I wrote for filtering clients */
    }
    const renderClientsByStatus = () => {
        switch (tableViewSelected) {
            case 'Active': {
                return clients.filter(client => client.active);
            }
            case 'Inactive': {
                return clients.filter(client => !client.active);
            }
            case 'All': {
                return clients;
            }
            default: {
                return [];
            }
        }


        const statusColors = [
            {
                statusName: 'active',
                statusDisplayName: 'Active Clients',
                statusColor: '#b2ff66',
            },
            {
                statusName: 'inactive',
                statusDisplayName: 'Inactive Clients',
                statusColor: 'red',
            },
        ];

        const { mutate: handleToggleActivateDeactivateClient } = useMutation(
            (payload) => useToggleStatus(payload)
        );

        const handleActivateDeactivateClient = (rowData) => {
            // debugger;
            handleToggleActivateDeactivateClient({
                client_file_number: rowData.client_file_number,
                enable_flag: rowData.enable_flag,
            });
        };

        const clientTableColumns = [
            {
                title: 'Status',
                field: 'is_active',

                cellStyle: {
                    textAlign: 'center',
                    // minWidth: '50px',
                },
                render: (rowData) => (
                    <div>
                        <Tooltip title={rowData.is_active === 1 ? 'Active' : 'Inactive'}>
                            <FiberManualRecordIcon
                                style={{
                                    color: rowData.is_active === 1 ? '#b2ff66' : red,
                                    fontSize: '18px',
                                }}
                            />
                        </Tooltip>
                    </div>
                ),
                // render: rowData => <a href={`/assignment?f=${rowData.client_file_number}&c=${rowData.client_name}`}>{rowData.client_name}</a>
            },
            {
                title: 'File No.',
                field: 'client_file_number',
                render: (rowData) => (
                    <a
                        href={`/assignment?s=${encodeURIComponent(
                            rowData.client_status
                        )}&f=${encodeURIComponent(
                            rowData.client_file_number
                        )}&c=${encodeURIComponent(
                            rowData.client_name
                        )}&p=${encodeURIComponent(rowData.profit_allocation_method)}`}
                    >
                        {rowData.client_file_number}
                    </a>
                ),
            },

            {
                title: 'Client Name',
                field: 'client_name',
                // render: rowData => <a href={`/assignment?f=${rowData.client_file_number}&c=${rowData.client_name}`}>{rowData.client_name}</a>
            },
            {
                title: 'PAN',
                field: 'pan',
            },
            {
                title: 'Email',
                field: 'email',
            },
            {
                title: 'GSTIN',
                field: 'gst',
            },
        ];

        const handleOpenAddUser = () => {
            setOpenAddUser(true);
        };

        const handleOpenAddClient = () => {
            setOpenAddClient(true);
        };

        const handleClose = () => {
            setOpenAddUser(false);
            setOpenImportTally(false);
            setFirmUserToEdit(null);
            setIsFirmUserUpdate(false);
            resetError();
        };

        const handleCloseClient = () => {
            setOpenAddClient(false);
            setIsUpdate(false);
            setClientName(null);
            setClientFileNumber(null);
            resetError();
            resetCurrentClient();
            setAddClientAction(false);
        };

        useEffect(() => {
            showContentFlagVariable = showContentFlag;
            updateUI();
            // this change of flag and updateUI is for when we switch views(myclient, myuser)
        }, [showContentFlag]);

        useEffect(() => {
            if (error && error.indexOf('Success') >= 0) {
                handleClose();
                if (addClientAction) {
                    setIsUpdate(true);
                }
            }
        }, [error]);

        const getAssureRoles = (roles) => {
            return roles
                .filter((r) => r.indexOf('Firm') >= 0)
                .map((r) => r.replace('Firm', ''))
                .join(',');
        };

        useEffect(() => {
            transformedUsers = [];
            if (users && users.length > 0) {
                transformedUsers = users.map((f, i) => {
                    return {
                        ...f,
                        serialNumber: i + 1,
                        assure_roles: getAssureRoles(f.roles),
                    };
                });
            }
        }, [users]);

        {
            /* Client Table */
        }
        const userStatus = ['Active', 'Inactive', 'All'];

        const clientTableActions = [
            roles && roles.includes('Firm External Auditor')
                ? ''
                : {
                    // This is the Component I have used filtering the table clients(active, inactive, all)
                    icon: (render) => {
                        return (
                            <ThemeProvider theme={newTheme}>
                                <FormControl style={{ paddingBottom: '17px' }}>
                                    <MultiSelect
                                        options={userStatus}
                                        placeholder="Client Status"
                                    />
                                </FormControl>
                            </ThemeProvider>
                        );
                    },
                    position: 'toolbar',
                },
            {
                icon: 'add',
                tooltip: 'Add a new client',
                isFreeAction: true,
                onClick: () => {
                    handleOpenAddClient();
                    setIsUpdate(false);
                    resetCurrentClient();
                },
            },
            {
                icon: 'save_alt',
                tooltip: 'Export Clients List',
                isFreeAction: true,
                onClick: () => {
                    excelDownload('My Clients', clientTableColumns, clients);
                },
            },
            {
                icon: 'edit',
                tooltip: 'Edit Client',
                onClick: (event, rowData) => {
                    getClientDetails(rowData.client_file_number);
                    getClientUsers(rowData.client_file_number);
                    getClientPreferences(rowData.client_file_number);
                    setIsUpdate(true);
                    handleOpenAddClient();
                    setAddClientAction(false);
                },
            },

            {
                // This is the toggle switch for activating/deactivating the clients
                icon: (rowData) => (
                    <div>
                        {/* {users.is_user_allowed_to_deactivate && ( */}
                        <FormGroup>
                            <Switch
                                color="primary"
                                checked={rowData.is_active === 1 ? true : false}
                                // defaultChecked
                                onChange={() => handleActivateDeactivateClient()}
                            />
                        </FormGroup>
                        {/* )} */}
                    </div>
                ),
                tooltip: 'Toggle to Deactivate User',
            },
        ];

        const teamTableActions = [];

        const addClientDetails = (cd, upd) => {
            setAddClientAction(true);
            addClient(cd, upd);
        };

        const classes = useStyles();

        return (
            <ThemeProvider theme={buttonTheme}>
                <div>
                    {/* <SimpleTabs/> */}
                    <Grid container spacing={3}>
                        <Grid
                            item
                            xs={6}
                            sm={4}
                            md={2}
                            style={{ display: displayHideComponent('clientPart') }}
                        >
                            <Card
                                title={<Typography>Active Clients</Typography>}
                                quantity={clients.length}
                                subtitle={''}
                                icon={<AccountBalanceIcon color="primary" fontSize="large" />}
                            />
                        </Grid>
                        {roles && roles.includes('Firm External Auditor') ? (
                            ''
                        ) : (
                            <Grid
                                item
                                xs={6}
                                sm={4}
                                md={2}
                                style={{ display: displayHideComponent('myTeamPart') }}
                            >
                                <Card
                                    title={<Typography>My Team</Typography>}
                                    quantity={users.length}
                                    subtitle={''}
                                    icon={<PeopleAltIcon fontSize="large" />}
                                />
                            </Grid>
                        )}
                    </Grid>

                    <Grid
                        container
                        spacing={2}
                        style={{ display: displayHideComponent('myTeamPart') }}
                    >
                        <Grid item xs={12}>
                            <FirmUserForm
                                open={openAddUser}
                                handleClose={() => handleClose()}
                                upsertFirmUser={(c) => {
                                    addFirmUser(
                                        {
                                            is_active: c.is_active,
                                            first_name: c.first_name,
                                            last_name: c.last_name,
                                            email: c.email,
                                            gender: 'Female',
                                            roles: c.roles,
                                            supervisor: c.supervisor,
                                            is_authorized_signatory: c.is_authorized_signatory
                                                ? c.is_authorized_signatory
                                                : '',
                                            authorized_signatory_role: c.authorized_signatory_role
                                                ? c.authorized_signatory_role
                                                : '',
                                            auditor_client_list:
                                                c.auditor_client_list &&
                                                c.auditor_client_list.filter(
                                                    (client) => client.allow_access
                                                ),
                                        },
                                        isFirmUserUpdate
                                    );
                                }}
                                users={users}
                                user={firmUserToEdit}
                                isUpdate={isFirmUserUpdate}
                                auditorClientList={auditorClientList}
                                getAuditorClientList={getAuditorClientList}
                            />
                            {userViews && userViews.includes('GET_FIRM_USER') && (
                                <Tables
                                    title={'My Team'}
                                    columns={teamTableColumns}
                                    data={transformedUsers}
                                    actions={
                                        userViews && userViews.includes('EDIT_FIRM_USER')
                                            ? [
                                                {
                                                    icon: 'edit',
                                                    tooltip: 'Edit User',
                                                    onClick: (event, rowData) => {
                                                        setIsFirmUserUpdate(true);
                                                        setFirmUserToEdit(rowData);
                                                        handleOpenAddUser();
                                                    },
                                                },
                                                {
                                                    icon: 'add',
                                                    tooltip: 'Add a team member',
                                                    isFreeAction: true,
                                                    onClick: () => {
                                                        setFirmUserToEdit({
                                                            is_active: '',
                                                            first_name: '',
                                                            last_name: '',
                                                            email: '',
                                                            roles: [],
                                                            supervisor: '',
                                                            is_authorized_signatory: 'No',
                                                            authorized_signatory_role: '',
                                                        });
                                                        handleOpenAddUser();
                                                    },
                                                },
                                            ]
                                            : teamTableActions
                                    }
                                    pageSize={10}
                                />
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            style={{ display: displayHideComponent('clientPart') }}
                        >
                            <AssureClientOnboard
                                isUpdate={isUpdate}
                                open={openAddClient}
                                handleClose={handleCloseClient}
                                stepLabels={[
                                    'Client Onboarding',
                                    'Client Preferences',
                                    'Client Users',
                                ]}
                                parseClientXml={parseClientXml}
                                UploadITR={UploadITR}
                                xmlFLag={xmlFLag}
                                host_site_url={host_site_url}
                                clientJson={clientJson}
                                addClient={addClientDetails}
                                clientDetails={clientDetails}
                                clientUsers={clientUsers}
                                addClientUser={addClientUser}
                                metadata={metadata}
                                addClientPreferences={addClientPreferences}
                                clientPreferences={clientPreferences}
                                addGroup={addGroup}
                                groups={groups}
                                error={error}
                                clientPreferenceChecklist={clientPreferenceChecklist}
                                checklist={checklist}
                                cleanChecklist={cleanChecklist}
                                getCheckpoints={getCheckpoints}
                                firmCheckpoints={firmCheckpoints}
                                downloadITRXml={downloadITRXml}
                            />

                            {/* Client Table */}
                            <Tables
                                title={'My Clients'}
                                data={clients}
                                columns={clientTableColumns}
                                actions={clientTableActions}
                                // onRowClick={(e, rowData) => {
                                //   window.location = `/assignment?s=${encodeURIComponent(
                                //     rowData.client_status,
                                //   )}&f=${encodeURIComponent(
                                //     rowData.client_file_number,
                                //   )}&c=${encodeURIComponent(
                                //     rowData.client_name,
                                //   )}&p=${encodeURIComponent(rowData.profit_allocation_method)}`;
                                // }}
                                pageSize={10}
                            />
                            <div className={classes.tableStatusLegendDiv}>
                                {statusColors.map((el) => (
                                    <span className={classes.statusLegendSpan} key={el.statusName}>
                                        <FiberManualRecordIcon
                                            style={{
                                                // color: returnStatusColumnTableIconColor(el.statusName),
                                                fontSize: '18px',
                                            }}
                                        />{' '}
                                        {el.statusDisplayName}
                                    </span>
                                ))}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </ThemeProvider>
        );
    }

    function displayHideComponent(componentPlace) {
        let displayOrHideFlag = 'none';
        if (
            (showContentFlagVariable === 'myclients' ||
                showContentFlagVariable === '') &&
            componentPlace === 'clientPart'
        ) {
            displayOrHideFlag = '';
        } else if (
            (showContentFlagVariable === 'myusers' || showContentFlagVariable === '') &&
            componentPlace === 'myTeamPart'
        ) {
            displayOrHideFlag = '';
        } else {
            displayOrHideFlag = 'none';
        }

        return displayOrHideFlag;
    }
}