import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import BookIcon from '@mui/icons-material/Book';
import DescriptionIcon from '@mui/icons-material/Description';
import AppBar from '@mui/material/AppBar';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import Link from 'next/link';

const drawerWidth = 240;

const navItem1 = { displayName: 'Book Covers', path: '/bookCovers', icon: BookIcon };
const navItem2 = { displayName: 'Genres', path: '/genres', icon: DescriptionIcon };
// Commenting out Premades for now.
//const navItem3 = { displayName: 'Premades', path: '/premades', icon: AppShortcutIcon };

const navigationItems = [
	navItem1, navItem2
];

const Layout = ({ children }) => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const router = useRouter();

	const handleMobileDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	}

	const activeRoute = (routeName, currentRoute) => {
		return routeName === currentRoute ? true : false;
	}

	const drawer = (
		<div>
			<Box
				display="flex"
				justifyContent="flex-end"
			>
				<Toolbar>					
					<IconButton
						onClick={handleMobileDrawerToggle}
						sx={{
							display: { xs: 'block', sm: 'none' },
						}}
					>
					<ChevronLeftIcon />
				</IconButton>
			</Toolbar>
			</Box>
			<Divider />
			<List>
				{navigationItems.map((navItem, index) => (
					<Link href={navItem.path} key={index}>
						<MenuItem selected={activeRoute(navItem.path, router.pathname)}>
							<ListItem button key={index}>
								<ListItemIcon>
									<navItem.icon />
								</ListItemIcon>
								<ListItemText primary={navItem.displayName} />
							</ListItem>
						</MenuItem>
					</Link>
				))}
			</List>
		</div >
	)

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					boxShadow: 0,
					borderBottom: 1,
					borderColor: grey[300]
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleMobileDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						<Link href='/'>Admin</Link>
					</Typography>
				</Toolbar>
			</AppBar>
			<Divider />
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="Side navigation"
			>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleMobileDrawerToggle}
					ModalProps={
						{ keepMounted: true }
					}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
					open
				>
					{drawer}
				</Drawer>

			</Box>
			<Box
				component="main"
				sx={{ flexGrow: 1, p: 3, mt: 5, pt: 5, margintop: 20, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
			>{children}</Box>
		</Box>
	);
}

export default Layout;