package com.example.News.Controller;

import com.example.News.Exception.RoleAlreadyExistsException;
import com.example.News.Model.Role;
import com.example.News.Model.User;
import com.example.News.Service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {
    private final IRoleService roleService;
    @GetMapping("/all-roles")
    public ResponseEntity<List<Role>> getAllRoles(){
        List<Role> roles = roleService.getRoles();
        return ResponseEntity.ok(roles);
    }
    @PostMapping("/create-new-role")

    public ResponseEntity<String> createRole(@RequestBody String theRoleName){
        try{
            Role theRole = new Role(theRoleName);
            roleService.createRole(theRole);
            return ResponseEntity.ok("Role da duoc tao thanh cong");
        }catch(RoleAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
    @DeleteMapping("/delete/{roleId}")
    public void deleteRole(@PathVariable("roleId") Long roleId){
        roleService.DeleteRole(roleId);
    }
    @PostMapping("/delete-all-users-from-role/{roleId}")
    public Role removeAllUsersFromRole(@PathVariable("roleId") Long roleId){
        return roleService.removeAllUserFromRole(roleId);
    }

    @PostMapping("/remove-user-from-role")
    public User removeUserFromRole(@RequestParam("userId") Long userId,
                                   @RequestParam("roleId") Long roleId){
        return roleService.removeUserFromRole(userId,roleId);
    }
    @PostMapping("/assign-role-to-user")
    public User assignRoleToUser(@RequestParam("userId") Long userId,
                                 @RequestParam("roleId") Long roleId){
        System.out.println("User");
        System.out.println(userId);
        return roleService.assignRoleToUser(userId,roleId);
    }
}
